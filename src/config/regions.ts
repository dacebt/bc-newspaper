export type RegionOption = { id: string; label: string };

export const REGIONS: RegionOption[] = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  label: `Region ${i + 1}`,
}));
