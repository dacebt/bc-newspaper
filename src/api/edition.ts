import type { EditionOutput } from '../types/edition';

export async function getEdition(regionId: string, date: string): Promise<EditionOutput> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const url = `${baseUrl}/api/edition?region_id=${encodeURIComponent(regionId)}&date=${encodeURIComponent(date)}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Edition not found');
    } else if (response.status === 400) {
      throw new Error('Bad request');
    } else {
      throw new Error('Request failed');
    }
  }

  return response.json() as Promise<EditionOutput>;
}
