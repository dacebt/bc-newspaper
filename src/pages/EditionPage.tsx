import { useState, useEffect } from 'react';
import { Box, Grid, Heading, Text, VStack, HStack, Spinner, Alert, AlertIcon, Select, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { getEdition } from '../api/edition';
import { InlineMarkdown } from '../components/InlineMarkdown';
import type { EditionOutput } from '../types/edition';

// Hardcoded defaults - can be made configurable later
const DEFAULT_REGION_ID = '1';
const DEFAULT_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

export function EditionPage() {
  const [regionId, setRegionId] = useState(DEFAULT_REGION_ID);
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
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="surface.base">
        <VStack spacing={4}>
          <Spinner size="xl" color="text.primary" />
          <Text color="text.primary">Loading edition...</Text>
        </VStack>
      </Box>
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

  if (!edition) {
    return null;
  }

  return (
    <Box bg="surface.base" color="text.primary" minH="100vh">
      {/* Controls */}
      <Box p={4} borderBottom="1px" borderColor="border.default">
        <HStack spacing={4} wrap="wrap">
          <FormControl maxW="200px">
            <FormLabel color="text.secondary" fontSize="sm">Region</FormLabel>
            <Select
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              bg="surface.overlay"
              borderColor="border.default"
              color="text.primary"
            >
              <option value="1">Region 1</option>
              <option value="2">Region 2</option>
            </Select>
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel color="text.secondary" fontSize="sm">Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              bg="surface.overlay"
              borderColor="border.default"
              color="text.primary"
            />
          </FormControl>
          {loading && <Spinner size="sm" color="text.primary" />}
        </HStack>
      </Box>

      {/* Error Message */}
      {error && renderErrorMessage()}

      {/* Masthead */}
      <Box p={8} borderBottom="1px" borderColor="border.default">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="2xl" color="text.primary">
            {edition?.title || 'BitCraft Regional Newspaper'}
          </Heading>
          {edition?.subtitle && (
            <Heading as="h2" size="lg" color="text.secondary">
              {edition.subtitle}
            </Heading>
          )}
          <HStack spacing={4}>
            <Text color="text.secondary">
              Region: {regionId}
            </Text>
            <Text color="text.secondary">
              Date: {date}
            </Text>
          </HStack>
        </VStack>
      </Box>

      {/* Body */}
      <Box p={8}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Main Story */}
          <Box>
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="xl" color="text.primary">
                {edition?.main_story.headline || 'Main Story'}
              </Heading>
              {edition?.main_story.angle && (
                <Text color="text.secondary" fontStyle="italic">
                  {edition.main_story.angle}
                </Text>
              )}
              <InlineMarkdown text={edition?.main_story.body_md || 'No story content available.'} />
            </VStack>
          </Box>

          {/* Announcements */}
          <Box>
            <VStack spacing={4} align="stretch">
              <Heading as="h3" size="lg" color="text.primary">
                Announcements
              </Heading>
              <VStack spacing={4} align="stretch">
                {edition?.announcements.length ? (
                  edition.announcements.map((announcement, index) => (
                    <Box
                      key={index}
                      p={4}
                      bg="surface.overlay"
                      borderRadius="md"
                      border="1px"
                      borderColor="border.default"
                    >
                      <Heading as="h4" size="md" color="text.primary" mb={2}>
                        {announcement.title}
                      </Heading>
                      <Text color="text.secondary">
                        {announcement.summary}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Box
                    p={4}
                    bg="surface.overlay"
                    borderRadius="md"
                    border="1px"
                    borderColor="border.default"
                  >
                    <Text color="text.secondary">
                      No announcements available.
                    </Text>
                  </Box>
                )}
              </VStack>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
