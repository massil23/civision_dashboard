import React from 'react';
import {DataItem} from "@/database/api";
import Card from "@/components/Card";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    Legend, Cell
} from 'recharts';

interface AgeDsitributionChartProps {
    items: DataItem[];
}

interface AgeGroup {
    range: string;
    count: number;
    percentage: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: AgeGroup;
    }>;
}

function AgeDsitributionChart({items}: AgeDsitributionChartProps) {

    const ColorPalette = [
        '#7171ed',
        '#4f804f',
        '#fdb72c',
        '#c25128',
    ]

    const createAgeGroups = (items: DataItem[]): AgeGroup[] => {
        // Initialisation des compteurs pour chaque âge
        const ageRanges: { [key: string]: number } = {};

        // Création des clés pour les âges de 20 à 31 ans
        for (let age = 20; age <= 31; age++) {
            ageRanges[age.toString()] = 0;
        }

        // Comptage des personnes pour chaque âge
        items.forEach(item => {
            if (item.age >= 20 && item.age <= 31) {
                ageRanges[item.age.toString()]++;
            }
        });

        // On calcul des pourcentages et création des données finales
        const totalInRange = items.filter(item => item.age >= 20 && item.age <= 31).length;
        return Object.entries(ageRanges).map(([age, count]) => ({
            range: `${age} ans`,
            count,
            percentage: totalInRange > 0 ? parseFloat(((count / totalInRange) * 100).toFixed(1)) : 0
        }));
    };

    const CustomTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-2 border rounded shadow-sm">
                    <p className="font-semibold">{data.range}</p>
                    <p>{`Nombre: ${data.count}`}</p>
                    <p>{`Pourcentage: ${data.percentage}%`}</p>
                </div>
            );
        }
        return null;
    };

    const ageData = createAgeGroups(items);

    // On calcul du nombre total de personnes dans et hors de la tranche 20-31 ans
    const totalInRange = items.filter(item => item.age >= 20 && item.age <= 31).length;
    const totalOutOfRange = items.length - totalInRange;

    return (
        <Card className={"p-6 flex-1"}>
            <h2 className={"tracking-light leading-none font-semibold text-2xl"}>
                Distribution des âges (20-31 ans)
            </h2>
            {totalOutOfRange > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                    Note: {totalOutOfRange} personne(s) hors de la tranche d'âge 20-31 ans
                </p>
            )}
            <div className="mt-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={ageData}
                            dataKey="percentage"
                            nameKey="range"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({
                                        name,
                                        percent
                                    }) => percent > 0 ? `${name} (${(percent * 100).toFixed(1)}%)` : ''}
                            labelLine={true}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {ageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ColorPalette[index % ColorPalette.length]}/>
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip/>}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export default AgeDsitributionChart;