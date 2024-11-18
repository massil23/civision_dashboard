import React from 'react';
import Card from "@/components/Card";
import {DataItem} from "@/database/api";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar, Cell
} from 'recharts';

interface PriceTrendChartProps {
    items: DataItem[];
}

interface BarData {
    season: string;
    avgPrice: number;
    count: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: BarData;
    }>;
}

export default function AgePriceScatterChart({items}: PriceTrendChartProps) {
    
    const seasonToColor = (type: 'hiver' | 'printemps' | 'été' | 'automne') => {
        switch (type) {
            case 'hiver':
                return '#7171ed';
            case 'printemps':
                return '#4f804f';
            case 'été':
                return '#fdb72c';
            case 'automne':
                return '#c25128';
        }
    }

    const createBarData = (items: DataItem[]): BarData[] => {
        const barData: BarData[] = [];
        // On rempli les données pour chaque saison
        items.forEach((item) => {
            const index = barData.findIndex((barItem) => barItem.season === item.saison);
            if (index !== -1) {
                barData[index].avgPrice += item.prix;
                barData[index].count += 1;
            } else {
                barData.push({season: item.saison, avgPrice: item.prix, count: 1});
            }
        })
        barData.forEach((barItem) => {
            barItem.avgPrice = parseFloat((barItem.avgPrice / barItem.count).toFixed(2));
        });
        // On trie les saisons dans l'ordre
        barData.sort((a, b) => {
            return ['hiver', 'printemps', 'été', 'automne'].indexOf(a.season) - ['hiver', 'printemps', 'été', 'automne'].indexOf(b.season);
        });
        return barData;
    }

    const CustomTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-2 border rounded shadow-sm">
                    <p className="font-semibold">
                        {data.season.charAt(0).toUpperCase() + data.season.slice(1)}
                    </p>
                    <p>{`Prix moyen: ${data.avgPrice}€`}</p>
                    <p>{`Nombre d'offres: ${data.count}`}</p>
                </div>
            );
        }
        return null;
    };

    const barData = createBarData(items);

    return (
        <Card className={"p-6 flex-1"}>
            <h2 className={"tracking-light leading-none font-semibold text-2xl"}>Prix moyen par saison</h2>
            <div className="mt-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={barData}
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}
                    >
                        <CartesianGrid/>
                        <XAxis
                            dataKey="season"
                            tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                        />
                        <YAxis
                            label={{
                                value: 'Prix moyen ($)',
                                angle: -90,
                                position: 'insideLeft',
                                style: {textAnchor: 'middle'}
                            }}
                        />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Bar
                            dataKey="avgPrice"
                            name="Prix moyen"
                        >
                            {barData.map((entry, index) => (
                                <Cell
                                    key={`${index}`}
                                    fill={seasonToColor(entry.season as 'hiver' | 'printemps' | 'été' | 'automne')}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}