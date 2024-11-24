import React from 'react';
import { Card, CardHeader, CardContent, CardActions, CardActionArea } from '@mui/material'

type MonsterProps = {
    monster: {
        name: string;
        type: string;
        size: string;
        cr: number;
        resistances: string[];
        vulnerabilities: string[];
        stats?: { strength: number; dexterity: number; constitution: number, intelligence: number, wisdom: number, charisma: number };
        lairActions?: string[];
    };
};

export const MonsterCard: React.FC<MonsterProps> = ({ monster }) => {
    if (!monster) return null; // Safeguard against missing monster data

    const {
        name,
        type,
        size,
        cr,
        resistances = [],
        vulnerabilities = [],
        stats,
        lairActions = [],
    } = monster;

    return (
        <Card>
            <CardHeader title={name || 'Unnamed Monster'} />
            <CardContent>
                <p><strong>Type:</strong> {type}</p>
                <p><strong>Size:</strong> {size}</p>
                <p><strong>Challenge Rating:</strong> {cr}</p>
                <p><strong>Resistances:</strong> {resistances.length ? resistances.join(', ') : 'None'}</p>
                <p><strong>Vulnerabilities:</strong> {vulnerabilities.length ? vulnerabilities.join(', ') : 'None'}</p>
                {stats && (
                    <div style={{ marginTop: '10px' }}>
                        <h3>Stats:</h3>
                        <ul>
                            <li><strong>Strength:</strong> {stats.strength}</li>
                            <li><strong>Dexterity:</strong> {stats.dexterity}</li>
                            <li><strong>Constitution:</strong> {stats.constitution}</li>
                            <li><strong>Intelligence:</strong> {stats.intelligence}</li>
                            <li><strong>Wisdom:</strong> {stats.wisdom}</li>
                            <li><strong>Charisma:</strong> {stats.charisma}</li>
                        </ul>
                    </div>
                )}
                {lairActions.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Lair Actions:</h3>
                        <ul>
                            {lairActions.map((action, index) => (
                                <li key={index}>{action}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};