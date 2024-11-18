import {FilterOptions} from "@/components/FilterBar";
import database from './database.json';

export interface DataItem {
    id: number;
    saison: 'hiver' | 'printemps' | 'été' | 'automne';
    prix: number;
    age: number;
    niveau: 'novice' | 'moyen' | 'pro';
    compte: boolean;
    passe: 'simple' | 'double' | 'illimité';
}

export const DEFAULT_FILTER: FilterOptions = {
    prix: 0,
    saison: undefined, // 'Toutes les saisons'
    niveau: undefined, // 'Tous les niveaux'
    passe: undefined, // 'Tous les types de passe'+
    compteSeulement: false
}

export const getItemsFromJSON = (): DataItem[] => {
    return database as DataItem[];
}