import React from 'react';
import Card from "@/components/Card";

interface ItemInfoCardProps {
    label: string;
    value: string;
}

function ItemInfoCard({label, value}: ItemInfoCardProps) {
    return (
        <Card className={"p-6 flex-1"}>
            <p className={"font-medium text-sm"}>{label}</p>
            <h2 className="mt-2 text-2xl font-bold">{value}</h2>
        </Card>
    );
}

export default ItemInfoCard;