import { useState, useEffect, useRef } from 'react';
import { Box, Flex, Grid, Heading, Text, Spinner, Alert, AlertIcon, Select, Input, Link as ChakraLink, Divider } from '@chakra-ui/react';
import { getEdition } from '../api/edition';
import { InlineMarkdown } from '../components/InlineMarkdown';
import { PaperWrapper, PaperTextureLayer, PaperContent } from '../components/PaperSurface';
import { REGIONS } from '../config/regions';
import type { EditionOutput } from '../types/edition';

const DEFAULT_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// Helper to validate region ID
function isValidRegionId(id: string): boolean {
  return REGIONS.some((r) => r.id === id);
}

// Helper to validate date format (YYYY-MM-DD)
function isValidDate(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

// Read query params from URL
function readQueryParams(): { regionId: string; date: string; textureDebug: boolean } {
  const params = new URLSearchParams(window.location.search);
  const regionParam = params.get('region');
  const dateParam = params.get('date');
  const textureParam = params.get('texture');

  const regionId = regionParam && isValidRegionId(regionParam) ? regionParam : REGIONS[0].id;
  const date = dateParam && isValidDate(dateParam) ? dateParam : DEFAULT_DATE;
  const textureDebug = textureParam === 'debug';

  return { regionId, date, textureDebug };
}

// Update URL query params
function updateQueryParams(regionId: string, date: string, replace = false) {
  const params = new URLSearchParams();
  params.set('region', regionId);
  params.set('date', date);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  if (replace) {
    window.history.replaceState({}, '', newUrl);
  } else {
    window.history.pushState({}, '', newUrl);
  }
}

// Helper to format date for masthead
function formatMastheadDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${dayName}, ${monthName} ${day}, ${year}`;
}

// Helper to compute volume and issue numbers from date
function computeVolumeAndIssue(dateStr: string): { volume: number; issue: number } {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // Volume = year - 2020 (or similar base year), Issue = day of year
  const volume = year - 2020;
  const issue = diffDays;
  
  return { volume: Math.max(1, volume), issue };
}

export function EditionPage() {
  const [regionId, setRegionId] = useState(() => readQueryParams().regionId);
  const [date, setDate] = useState(() => readQueryParams().date);
  const [textureDebug, setTextureDebug] = useState(() => readQueryParams().textureDebug);
  const [edition, setEdition] = useState<EditionOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  // Initialize URL params on mount
  useEffect(() => {
    if (isInitialMount.current) {
      // Ensure URL reflects current state (in case URL was missing params)
      updateQueryParams(regionId, date, true);
      isInitialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL when region/date changes (but not on initial mount)
  useEffect(() => {
    if (!isInitialMount.current) {
      updateQueryParams(regionId, date, true);
    }
  }, [regionId, date]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const { regionId: urlRegion, date: urlDate, textureDebug: urlTextureDebug } = readQueryParams();
      setRegionId(urlRegion);
      setDate(urlDate);
      setTextureDebug(urlTextureDebug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const fetchEdition = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEdition(regionId, date);
        setEdition(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setEdition(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEdition();
  }, [regionId, date]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="surface.base">
        <Flex direction="column" align="center" gap={4}>
          <Spinner size="xl" color="text.primary" />
          <Text color="text.primary">Loading edition...</Text>
        </Flex>
      </Flex>
    );
  }

  const renderErrorMessage = () => (
    <Box p={4}>
      <Alert status="error" borderRadius="md" mb={4}>
        <AlertIcon />
        No published edition for this region/date.
      </Alert>
    </Box>
  );

  return (
    <Box bg="surface.base" color="text.primary" minH="100vh">
      {/* Controls Bar - Single Horizontal Row */}
      <Flex
        p={4}
        borderBottom="1px"
        borderColor="border.default"
        bg="surface.overlay"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={4}
      >
        {/* Logo */}
        <ChakraLink
          href="/"
          fontSize="lg"
          fontWeight="medium"
          color="text.secondary"
          _hover={{ color: "text.primary", textDecoration: "none" }}
          transition="color 0.2s"
        >
          BC Codex News
        </ChakraLink>

        {/* Controls - Inline */}
        <Flex align="center" gap={3} wrap={{ base: "wrap", sm: "nowrap" }} minW="0">
          <Flex align="center" gap={2}>
            <Text color="text.secondary" fontSize="xs" whiteSpace="nowrap" id="region-label">Region:</Text>
            <Select
              size="sm"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              bg="surface.base"
              borderColor="border.default"
              color="text.primary"
              maxW="120px"
              aria-labelledby="region-label"
            >
              {REGIONS.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.label}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex align="center" gap={2}>
            <Text color="text.secondary" fontSize="xs" whiteSpace="nowrap" id="date-label">Date:</Text>
            <Input
              size="sm"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              bg="surface.base"
              borderColor="border.default"
              color="text.primary"
              maxW="140px"
              aria-labelledby="date-label"
            />
          </Flex>
          {loading && <Spinner size="sm" color="text.primary" />}
        </Flex>
      </Flex>

      {/* Error Message */}
      {(error || !edition) && renderErrorMessage()}

      {/* Edition Content - Paper Wrapper */}
      {edition && (() => {
        const { volume, issue } = computeVolumeAndIssue(date);
        const mastheadDate = formatMastheadDate(date);
        
        return (
          <Flex justify="center" p={{ base: 4, md: 8 }}>
            <PaperWrapper>
              <PaperTextureLayer debugMode={textureDebug} />
              <PaperContent>
                {/* Masthead - Classic Newspaper Nameplate */}
                <Box mb={6}>
                  {/* Nameplate - Large serif title matching reference */}
                  <Heading
                    as="h1"
                    fontSize={{ base: "5xl", md: "7xl" }}
                    fontWeight="black"
                    textAlign="center"
                    letterSpacing="tighter"
                    fontFamily={`"Times New Roman", Times, "Georgia", "Palatino", "Book Antiqua", serif`}
                    mb={3}
                    lineHeight="1"
                  >
                    {edition.title}
                  </Heading>
                  
                  {/* Rule System: Thick then thin (classic newspaper style) */}
                  <Box
                    borderTop="4px solid"
                    borderColor="paper.rule"
                    mb={1}
                  />
                  <Box
                    borderTop="1px solid"
                    borderColor="paper.rule"
                    mb={4}
                  />
                  
                  {/* Dateline Strip - Classic newspaper format */}
                  <Grid
                    templateColumns="1fr 2fr 1fr"
                    gap={3}
                    color="paper.muted"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontWeight="bold"
                    fontFamily={`"Times New Roman", Times, serif`}
                  >
                    {/* Left: Volume/Issue */}
                    <Text textAlign="left" fontSize="xs">
                      VOL. {volume} · NO. {issue}
                    </Text>
                    
                    {/* Center: Date and Region */}
                    <Text textAlign="center" fontSize="xs">
                      {mastheadDate} · REGION {regionId}
                    </Text>
                    
                    {/* Right: Edition placeholder */}
                    <Text textAlign="right" fontSize="xs">
                      EDITION
                    </Text>
                  </Grid>
                </Box>

            {/* Body - Two Column Layout */}
            <Grid
              templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
              gap={8}
            >
              {/* Main Story */}
              <Box>
                <Flex direction="column" gap={4}>
                  <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="bold"
                    lineHeight="tight"
                  >
                    {edition.main_story.headline}
                  </Heading>
                  {edition.main_story.angle && (
                    <Text
                      color="paper.muted"
                      fontStyle="italic"
                      fontSize="md"
                      borderLeft="3px solid"
                      borderColor="paper.rule"
                      pl={4}
                    >
                      {edition.main_story.angle}
                    </Text>
                  )}
                  <Box
                    fontSize="md"
                    lineHeight="1.6"
                    sx={{
                      // CSS columns for desktop
                      '@media (min-width: 768px)': {
                        columnCount: 2,
                        columnGap: '2rem',
                        columnRule: '1px solid',
                        columnRuleColor: 'paper.rule',
                      },
                      // Drop cap on first letter
                      '& > div::first-letter': {
                        float: 'left',
                        fontSize: '3.5em',
                        lineHeight: '0.9',
                        fontWeight: 'bold',
                        marginRight: '0.1em',
                        marginTop: '0.05em',
                      },
                    }}
                  >
                    <InlineMarkdown text={edition.main_story.body} />
                  </Box>
                </Flex>
              </Box>

              {/* Briefs (Announcements) */}
              <Box>
                <Heading
                  as="h3"
                  fontSize="lg"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  mb={4}
                  pb={2}
                  borderBottom="1px solid"
                  borderColor="paper.rule"
                >
                  Announcements
                </Heading>
                <Flex direction="column" gap={0}>
                  {edition.announcements.length ? (
                    edition.announcements.map((announcement, index) => (
                      <Box key={index}>
                        <Box py={3}>
                          <Heading
                            as="h4"
                            fontSize="md"
                            fontWeight="bold"
                            mb={2}
                          >
                            {announcement.title}
                          </Heading>
                          <Text
                            fontSize="sm"
                            color="paper.ink"
                            lineHeight="1.5"
                          >
                            {announcement.summary}
                          </Text>
                        </Box>
                        {index < edition.announcements.length - 1 && (
                          <Divider borderColor="paper.rule" />
                        )}
                      </Box>
                    ))
                  ) : (
                    <Text fontSize="sm" color="paper.muted" fontStyle="italic">
                      No announcements available.
                    </Text>
                  )}
                </Flex>
              </Box>
            </Grid>
              </PaperContent>
            </PaperWrapper>
          </Flex>
        );
      })()}
    </Box>
  );
}
