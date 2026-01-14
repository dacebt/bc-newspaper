import { useState, useEffect, useRef } from 'react';
import { Box, Flex, Grid, Heading, Text, Spinner, Alert, AlertIcon, Select, Input, Link as ChakraLink, Divider } from '@chakra-ui/react';
import { getEdition } from '../api/edition';
import { InlineMarkdown } from '../components/InlineMarkdown';
import { PaperWrapper, PaperTextureLayer, PaperContent } from '../components/PaperSurface';
import { REGIONS } from '../config/regions';
import type { EditionOutput } from '../types/edition';

const MIN_DATE = '2026-01-13'; // Deployment date - no editions before this
const DEFAULT_DATE = (() => {
  // Get today's date in local timezone (not UTC)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`; // YYYY-MM-DD format
  return today < MIN_DATE ? MIN_DATE : today;
})();

// Helper to validate region ID
function isValidRegionId(id: string): boolean {
  return REGIONS.some((r) => r.id === id);
}

// Read query params from URL
function readQueryParams(): { regionId: string } {
  const params = new URLSearchParams(window.location.search);
  const regionParam = params.get('region');

  const regionId = regionParam && isValidRegionId(regionParam) ? regionParam : REGIONS[0].id;

  return { regionId };
}

// Update URL query params
function updateQueryParams(regionId: string, replace = false) {
  const params = new URLSearchParams();
  params.set('region', regionId);
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

export function EditionPage() {
  const [regionId, setRegionId] = useState(() => readQueryParams().regionId);
  const [date, setDate] = useState(DEFAULT_DATE);
  const [edition, setEdition] = useState<EditionOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  // Initialize URL params on mount
  useEffect(() => {
    if (isInitialMount.current) {
      // Ensure URL reflects current state (in case URL was missing params)
      updateQueryParams(regionId, true);
      isInitialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL when region changes (but not on initial mount)
  useEffect(() => {
    if (!isInitialMount.current) {
      updateQueryParams(regionId, true);
    }
  }, [regionId]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const { regionId: urlRegion } = readQueryParams();
      setRegionId(urlRegion);
      // Date is not synced from URL - always stays as user set it
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

  const isWaitingForTodaysEdition = () => {
    // Check if requested date is today in local timezone
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (date !== todayString) {
      return false;
    }
    
    // Check if current UTC time is before 10:30 AM UTC
    const nowUTC = new Date();
    const utcHours = nowUTC.getUTCHours();
    const utcMinutes = nowUTC.getUTCMinutes();
    const currentUTCMinutes = utcHours * 60 + utcMinutes;
    const generationWindowEnd = 10 * 60 + 30; // 10:30 AM UTC in minutes
    
    return currentUTCMinutes < generationWindowEnd;
  };

  const getLocalGenerationTime = () => {
    // Create a date object for 10:00 AM UTC today
    const generationTime = new Date();
    generationTime.setUTCHours(10, 0, 0, 0);
    
    // Format as local time
    return generationTime.toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderErrorMessage = () => {
    const isWaiting = isWaitingForTodaysEdition();
    const localTime = isWaiting ? getLocalGenerationTime() : '';
    
    return (
      <Box p={4}>
        <Alert status={isWaiting ? "info" : "error"} borderRadius="md" mb={4}>
          <AlertIcon />
          {isWaiting ? (
            <Box>
              No edition published for this region for today's date. A new edition is published daily at 10:00 AM UTC ({localTime} your time). Check back later or select a previous date to view past editions!
            </Box>
          ) : (
            <Box>No published edition for this region/date.</Box>
          )}
        </Alert>
      </Box>
    );
  };

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
              min={MIN_DATE}
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
        const mastheadDate = formatMastheadDate(date);
        
        return (
          <Flex justify="center" p={{ base: 4, md: 8 }}>
            <PaperWrapper>
              <PaperTextureLayer />
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
                    templateColumns="1fr 1fr"
                    gap={3}
                    color="paper.muted"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontWeight="bold"
                    fontFamily={`"Times New Roman", Times, serif`}
                  >
                    {/* Left: Date and Region */}
                    <Text textAlign="left" fontSize="xs">
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
                    textAlign="center"
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
                            <InlineMarkdown text={announcement.title} />
                          </Heading>
                          <Text
                            fontSize="sm"
                            color="paper.ink"
                            lineHeight="1.5"
                          >
                            <InlineMarkdown text={announcement.summary} />
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
