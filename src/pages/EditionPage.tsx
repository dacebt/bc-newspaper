import { useState, useEffect } from 'react';
import { Box, Grid, Heading, Text, VStack, HStack, Spinner, Alert, AlertIcon, Select, Input, FormControl, FormLabel, Card, CardBody } from '@chakra-ui/react';
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

  return (
    <Box bg="surface.base" color="text.primary" minH="100vh">
      {/* Controls */}
      <Box p={4} borderBottom="1px" borderColor="border.default" bg="surface.overlay">
        <HStack spacing={4} wrap="wrap" opacity={0.8}>
          <FormControl maxW="150px">
            <FormLabel color="text.secondary" fontSize="xs" mb={1}>Region</FormLabel>
            <Select
              size="sm"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              bg="surface.base"
              borderColor="border.default"
              color="text.primary"
            >
              {REGIONS.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl maxW="150px">
            <FormLabel color="text.secondary" fontSize="xs" mb={1}>Date</FormLabel>
            <Input
              size="sm"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              bg="surface.base"
              borderColor="border.default"
              color="text.primary"
            />
          </FormControl>
          {loading && <Spinner size="sm" color="text.primary" />}
        </HStack>
      </Box>

      {/* Error Message */}
      {(error || !edition) && renderErrorMessage()}

      {/* Edition Content - only render when edition exists */}
      {edition && (
        <>
          {/* Masthead */}
          <Box p={8} borderBottom="1px" borderColor="border.default">
            <VStack spacing={2} align="stretch">
              <Heading as="h1" size="3xl" color="text.primary" fontWeight="bold">
                {edition.title}
              </Heading>
              {edition.subtitle && (
                <Heading as="h2" size="md" color="text.secondary" opacity={0.7} fontWeight="normal">
                  {edition.subtitle}
                </Heading>
              )}
              <HStack spacing={6} mt={2}>
                <Text color="text.secondary" fontSize="sm">
                  Region: {regionId}
                </Text>
                <Text color="text.secondary" fontSize="sm">
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
                    {edition.main_story.headline}
                  </Heading>
                  {edition.main_story.angle && (
                    <Text color="text.secondary" fontStyle="italic">
                      {edition.main_story.angle}
                    </Text>
                  )}
                  <InlineMarkdown text={edition.main_story.body_md} />
                </VStack>
              </Box>

              {/* Announcements */}
              <Box>
                <VStack spacing={4} align="stretch">
                  <Heading as="h3" size="lg" color="text.primary">
                    Announcements
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    {edition.announcements.length ? (
                      edition.announcements.map((announcement, index) => (
                        <Card key={index} variant="elevated">
                          <CardBody>
                            <Heading as="h4" size="md" color="text.primary" mb={2}>
                              {announcement.title}
                            </Heading>
                            <Text color="text.secondary">
                              {announcement.summary}
                            </Text>
                          </CardBody>
                        </Card>
                      ))
                    ) : (
                      <Card variant="elevated">
                        <CardBody>
                          <Text color="text.secondary">
                            No announcements available.
                          </Text>
                        </CardBody>
                      </Card>
                    )}
                  </VStack>
                </VStack>
              </Box>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
