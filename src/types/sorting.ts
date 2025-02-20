export type SortField = 'firstName' | 'lastName' | 'city' | 'degree' | 'yearsOfExperience';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
} 