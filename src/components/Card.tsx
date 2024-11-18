import React from 'react';

interface CardProps {
    className?: string;
    children: React.ReactNode;
}

function Card({className, children}: CardProps) {
    return (
        <div className={`rounded-lg border shadow-sm ${className}`}>
            {children}
        </div>
    );
}

export default Card;