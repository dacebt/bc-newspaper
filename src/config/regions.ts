export type RegionOption = { id: string; label: string };

const ACTIVE_REGION_IDS = ["7", "8", "9", "12", "13", "14", "17", "18", "19"] as const;

export const REGIONS: RegionOption[] = ACTIVE_REGION_IDS.map((id) => ({
  id,
  label: `Region ${id}`,
}));
