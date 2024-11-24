import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Button,
} from '@mui/material';
import { PDFGenerator } from './PDFGenerator';

type MonsterProps = {
    monster: {
        name: string;
        type: string;
        size: string;
        cr: number;
        resistances: string[];
        vulnerabilities: string[];
        stats?: { strength: number; dexterity: number; constitution: number; intelligence: number; wisdom: number; charisma: number };
        lairActions?: string[];
        legendaryResistances?: number;
    };
};

export const MonsterCard: React.FC<MonsterProps> = ({ monster }) => {
    const [editableMonster, setEditableMonster] = useState(monster);

    // State to manage editable fields

    const handleInputChange = (field: string, value: any) => {
        setEditableMonster((prev) => ({ ...prev, [field]: value }));
    };

    const handleStatsChange = (stat: string, value: number) => {
        setEditableMonster((prev) => ({
            ...prev,
            stats: { ...prev.stats, [stat]: value },
        }));
    };

    // Validation for Legendary Resistances and Challenge Rating
    const isValidCR = (value: number) =>
        [0, 0.125, 0.25, 0.5, ...Array.from({ length: 30 }, (_, i) => i + 1)].includes(value);

    return (
        <Card sx={{margin: '8px'}}>
            <CardHeader
                title={
                    <TextField
                        label='Name'
                        variant='outlined'
                        value={editableMonster.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        fullWidth
                    />
                }
            />
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <TextField
                            label='Type'
                            variant='outlined'
                            value={editableMonster.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            label='Size'
                            variant='outlined'
                            value={editableMonster.size}
                            onChange={(e) => handleInputChange('size', e.target.value)}
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            label='Challenge Rating'
                            variant='outlined'
                            value={editableMonster.cr}
                            type='number'
                            error={!isValidCR(editableMonster.cr)}
                            helperText={!isValidCR(editableMonster.cr) ? 'Invalid CR value' : ''}
                            onChange={(e) => handleInputChange('cr', parseFloat(e.target.value))}
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            label='Resistances'
                            variant='outlined'
                            value={editableMonster.resistances && editableMonster.resistances.join(', ')}
                            onChange={(e) =>
                                handleInputChange('resistances', e.target.value.split(',').map((r) => r.trim()))
                            }
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            label='Vulnerabilities'
                            variant='outlined'
                            value={editableMonster.vulnerabilities && editableMonster.vulnerabilities.join(', ')}
                            onChange={(e) =>
                                handleInputChange('vulnerabilities', e.target.value.split(',').map((v) => v.trim()))
                            }
                            fullWidth
                            margin='dense'
                        />
                        <TextField
                            label='Legendary Resistances'
                            variant='outlined'
                            value={editableMonster.legendaryResistances || 0}
                            type='number'
                            inputProps={{ min: 0, max: 3 }}
                            onChange={(e) =>
                                handleInputChange('legendaryResistances', parseInt(e.target.value, 10))
                            }
                            fullWidth
                            margin='dense'
                        />
                    </div>
                    <div style={{ marginLeft: '12px' }}>
                        {editableMonster.stats && (
                            <div>   
                                {Object.entries(editableMonster.stats).map(([stat, value]) => (
                                    <TextField
                                        key={stat}
                                        label={stat.charAt(0).toUpperCase() + stat.slice(1)}
                                        variant='outlined'
                                        value={value}
                                        type='number'
                                        onChange={(e) => handleStatsChange(stat, parseInt(e.target.value, 10))}
                                        fullWidth
                                        margin='dense'
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {editableMonster.lairActions?.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Lair Actions:</h3>
                        <TextField
                            label='Lair Actions'
                            variant='outlined'
                            value={editableMonster.lairActions.join(', ')}
                            onChange={(e) =>
                                handleInputChange('lairActions', e.target.value.split(',').map((la) => la.trim()))
                            }
                            fullWidth
                            margin='dense'
                        />
                    </div>
                )}
            </CardContent>
            <CardActions>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => console.log('Save changes', editableMonster)}
                >
                    Save Changes
                </Button>
                <PDFGenerator monster={editableMonster} />
            </CardActions>
        </Card>
    );
};