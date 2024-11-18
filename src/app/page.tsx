"use client" // On utilise la version client de React pour le rendu côté client
import FilterBar, {FilterOptions} from "@/components/FilterBar";
import {useEffect, useState} from "react";
import {DataItem, DEFAULT_FILTER, getItemsFromJSON} from "@/database/api";
import ItemInfoCard from "@/components/ItemInfoCard";
import AgePriceScatterChart from "@/components/AgePriceScatterChart";
import AgeDsitributionChart from "@/components/AgeDsitributionChart";

export default function Dashboard() {
    const [filter, setFilter] = useState<FilterOptions>(DEFAULT_FILTER);
    const [items, setItems] = useState<DataItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);

    useEffect(() => {
        // On récupère les données
        const data = getItemsFromJSON();
        setItems(data);
        setFilteredItems(data);
    }, [])

    const setFilterValue = (key: keyof FilterOptions, value: FilterOptions[keyof FilterOptions]) => {
        setFilter({...filter, [key]: value});
    };

    const resetFilter = () => {
        setFilter(DEFAULT_FILTER);
    }

    useEffect(() => {
        setFilteredItems(items.filter((item) => {
            return (
                item.prix >= filter.prix &&
                (filter.saison ? item.saison === filter.saison : true) &&
                (filter.niveau ? item.niveau === filter.niveau : true) &&
                (filter.passe ? item.passe === filter.passe : true) &&
                (filter.compteSeulement ? item.compte : true)
            );
        }));
    }, [filter, items])

    const avgPrice = filteredItems.reduce((acc, item) => acc + item.prix, 0) / filteredItems.length;

    return (
        <div className="p-10 max-w-7xl mx-auto flex flex-col gap-8">
            <h1 className={"pb-4"}>Tableau de bord</h1>
            <FilterBar filter={filter} setFilter={setFilterValue} resetFilter={resetFilter}/>
            <div className={"flex flex-col sm:flex-row gap-4 w-full"}>
                <ItemInfoCard label={"Prix moyen"} value={avgPrice.toFixed(2).toString() + "$"}/>
                <ItemInfoCard label={"Nombre de passes"} value={filteredItems.length.toString()}/>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <AgePriceScatterChart items={filteredItems}/>
                <AgeDsitributionChart items={filteredItems}/>
            </div>
        </div>
    );
}
