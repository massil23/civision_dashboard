import React from 'react';

export interface FilterOptions {
    prix: number;
    saison?: 'hiver' | 'printemps' | 'été' | 'automne';
    niveau?: 'novice' | 'moyen' | 'pro';
    passe?: 'simple' | 'double' | 'illimité';
    compteSeulement: boolean;
}

interface FilterBarProps {
    filter: FilterOptions;
    setFilter: (key: keyof FilterOptions, value: FilterOptions[keyof FilterOptions]) => void;
    resetFilter: () => void;
}

const ComboBoxList = [
    {
        label: 'Saison',
        placeholder: 'toutes',
        options: ['hiver', 'printemps', 'été', 'automne'],
        key: 'saison'
    },
    {
        label: 'Niveau',
        placeholder: 'tous',
        options: ['novice', 'moyen', 'pro'],
        key: 'niveau'
    },
    {
        label: 'Type de passe',
        placeholder: 'tous',
        options: ['simple', 'double', 'illimité'],
        key: 'passe'
    },
]

function FilterBar({filter, setFilter, resetFilter}: FilterBarProps) {
    return (
        <div className={"drop-shadow-sm rounded-md bg-white p-2"}>
            <div className="flex sm:flex-row flex-col  ">
                <div className={"p-2"}>
                    <Label text={'Prix minimum'}/>
                    <input
                        type="number"
                        value={filter.prix}
                        onChange={(e) => setFilter('prix', parseInt(e.target.value))}
                        min={0}
                        className="w-full sm:w-auto p-2 border rounded-md mt-2"
                    />
                </div>
                {/* On initialise les ComboBox à partir de ComboBoxList */}
                {ComboBoxList.map(({label, options, placeholder, key}) => (
                    <ComboBox
                        key={key}
                        label={label}
                        placeholder={placeholder}
                        value={filter[key as keyof FilterOptions]}
                        options={options}
                        onChange={(value) => setFilter(key as keyof FilterOptions, value as any)}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-1 p-2">
                <div className={"flex flex-row items-center gap-2"}>
                    <input
                        type="checkbox"
                        checked={filter.compteSeulement}
                        onChange={(e) => setFilter('compteSeulement', e.target.checked)}
                        className="p-2"
                    />
                    <Label text={'Compte seulement?'}/>
                </div>
                <button
                    onClick={resetFilter}
                    className="py-2 px-4 border-gray-200 border rounded-md text-gray-800 font-semibold hover:bg-gray-100"
                >
                    Réinitialiser
                </button>
            </div>
        </div>
    );
}

function Label({text}: { text: string }) {
    return (
        <div className="flex flex-col w-full sm:w-1/3 text-sm text-gray-900 font-semibold whitespace-nowrap">
            <label>{text}</label>
        </div>
    );
}

function ComboBox({label, placeholder, value, options, onChange}: {
    label: string,
    placeholder: string,
    value: any,
    options: string[],
    onChange: (value: string | undefined) => void
}) {
    return (
        <div className="flex flex-col w-full sm:w-1/3 p-2">
            <Label text={label}/>
            <select
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value === "" ? undefined : e.target.value)}
                className={"p-2 border rounded-md mt-2"}
            >
                <option value="">
                    {placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {/* On met la première lettre en majuscule */}
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterBar;