import { useState, useEffect } from 'react';
import { Box, Flex, Grid, Heading, Text, Spinner, Alert, AlertIcon, Select, Input, Link as ChakraLink, Divider } from '@chakra-ui/react';
import { getEdition } from '../api/edition';
import { InlineMarkdown } from '../components/InlineMarkdown';
import { REGIONS } from '../config/regions';
import type { EditionOutput } from '../types/edition';

const DEFAULT_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

export function EditionPage() {
  const [regionId, setRegionId] = useState(REGIONS[0].id);
  const [date, setDate] = useState(DEFAULT_DATE);
  const [edition, setEdition] = useState<EditionOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          bccodex-news
        </ChakraLink>

        {/* Controls - Inline */}
        <Flex align="center" gap={3} wrap="wrap">
          <Flex align="center" gap={2}>
            <Text color="text.secondary" fontSize="xs" whiteSpace="nowrap">Region:</Text>
            <Select
              size="sm"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              bg="surface.base"
              borderColor="border.default"
              color="text.primary"
              maxW="120px"
            >
              {REGIONS.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.label}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex align="center" gap={2}>
            <Text color="text.secondary" fontSize="xs" whiteSpace="nowrap">Date:</Text>
            <Input
              size="sm"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              bg="surface.base"
              borderColor="border.default"
              color="text.primary"
              maxW="140px"
            />
          </Flex>
          {loading && <Spinner size="sm" color="text.primary" />}
        </Flex>
      </Flex>

      {/* Error Message */}
      {(error || !edition) && renderErrorMessage()}

      {/* Edition Content - Paper Wrapper */}
      {edition && (
        <Flex justify="center" p={{ base: 4, md: 8 }}>
          <Box
            bg="paper.bg"
            color="paper.ink"
            maxW="1200px"
            w="100%"
            p={{ base: 6, md: 10 }}
            border="1px"
            borderColor="paper.rule"
            boxShadow="paper"
          >
            {/* Masthead - Newspaper Style */}
            <Flex direction="column" align="center" mb={8} pb={6} borderBottom="2px double" borderColor="paper.rule">
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="black"
                textAlign="center"
                mb={2}
                letterSpacing="tight"
              >
                {edition.title}
              </Heading>
              {edition.subtitle && (
                <Heading
                  as="h2"
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="normal"
                  color="paper.muted"
                  textAlign="center"
                  mb={3}
                >
                  {edition.subtitle}
                </Heading>
              )}
              <Flex gap={6} fontSize="xs" color="paper.muted" textTransform="uppercase" letterSpacing="wide">
                <Text>Region {regionId}</Text>
                <Text>•</Text>
                <Text>{date}</Text>
              </Flex>
            </Flex>

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
          </Box>
        </Flex>
      )}
    </Box>
  );
}
