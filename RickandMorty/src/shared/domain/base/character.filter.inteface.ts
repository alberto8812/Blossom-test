export type NameFilter = 'name' | 'speciesId' | 'status' | 'originId';
export interface CharacterFilter {
    name?: string;
    speciesId?: string;
    status?: string;
    originId?: string;
}