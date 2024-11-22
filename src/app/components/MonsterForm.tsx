import React, { useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    OutlinedInput,
    SelectChangeEvent,
    Autocomplete,
} from '@mui/material';

const monsterTypes = [
    'Any',
    'Aberration',
    'Beast',
    'Celestial',
    'Construct',
    'Dragon',
    'Elemental',
    'Fey',
    'Fiend',
    'Giant',
    'Humanoid',
    'Monstrosity',
    'Ooze',
    'Plant',
    'Undead',
];

const sizes = ['Any', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];

const resistancesOptions = [
    'Fire',
    'Cold',
    'Acid',
    'Lightning',
    'Poison',
    'Psychic',
    'Radiant',
    'Necrotic',
];

const vulnerabilitiesOptions = [
    'Fire',
    'Cold',
    'Acid',
    'Lightning',
    'Poison',
    'Psychic',
    'Radiant',
    'Necrotic',
];

// Type for the props
export interface MonsterFormProps {
    onSubmit: (data: {
        types: string[];
        size: string;
        minCR: number;
        maxCR: number;
        hasLairActions: boolean;
        resistances?: string[];
        vulnerabilities?: string[];
    }) => void;
}

const MonsterForm: React.FC<MonsterFormProps> = ({ onSubmit }) => {
    const [hasLairActions, setHasLairActions] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['Any']);
    const [selectedSize, setSelectedSize] = useState<string>('Any');
    const [minCR, setMinCR] = useState(0.25);
    const [maxCR, setMaxCR] = useState(30);
    const [selectedResistances, setSelectedResistances] = useState<string[]>([]);
    const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<string[]>([]);

    const handleMinCRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinCR(event.target.value ? parseFloat(event.target.value) : 0.25);
    };

    const handleMaxCRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxCR(event.target.value ? parseFloat(event.target.value) : 30);
    };

    const handleTypeChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedTypes(event.target.value as string[]);
    };

    const handleSizeChange = (event: SelectChangeEvent<string>) => {
        setSelectedSize(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            types: selectedTypes.includes('Any') ? undefined : selectedTypes,
            size: selectedSize === 'Any' ? undefined : selectedSize,
            minCR: minCR || 0.25,
            maxCR: maxCR || 30,
            hasLairActions: hasLairActions || false,
            resistances: selectedResistances.length > 0 ? selectedResistances : undefined,
            vulnerabilities: selectedVulnerabilities.length > 0 ? selectedVulnerabilities : undefined,
        };

        // Send processed data to the parent component
        onSubmit(formData);
    };

    return (
        <form onSubmit={(e) => handleFormSubmit(e)}>
            <Select
                name="type"
                multiple
                fullWidth
                value={selectedTypes}
                onChange={handleTypeChange}
                input={<OutlinedInput />}
                renderValue={(selected) => selected.join(', ')}
                style={{ marginBottom: '20px' }}
            >
                {monsterTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                ))}
            </Select>

            <TextField
                label="Minimum Challenge Rating"
                type="number"
                name="minCR"
                fullWidth
                value={minCR}
                onChange={handleMinCRChange}
                required
                inputProps={{ min: 0.25, max: 30, step: 0.25 }}
                style={{ marginBottom: '20px' }}
            />

            <TextField
                label="Maximum Challenge Rating"
                type="number"
                name="maxCR"
                fullWidth
                value={maxCR}
                onChange={handleMaxCRChange}
                required
                inputProps={{ min: 0.25, max: 30, step: 0.25 }}
                style={{ marginBottom: '20px' }}
            />

            <Select
                name="size"
                fullWidth
                value={selectedSize}
                onChange={handleSizeChange}
                style={{ marginBottom: '20px' }}
            >
                {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                        {size}
                    </MenuItem>
                ))}
            </Select>

            <Autocomplete
                multiple
                options={resistancesOptions}
                value={selectedResistances}
                onChange={(event, newValue) => setSelectedResistances(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Resistances" placeholder="Choose resistances" />
                )}
                style={{ marginBottom: '20px' }}
            />

            <Autocomplete
                multiple
                options={vulnerabilitiesOptions}
                value={selectedVulnerabilities}
                onChange={(event, newValue) => setSelectedVulnerabilities(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Vulnerabilities" placeholder="Choose vulnerabilities" />
                )}
                style={{ marginBottom: '20px' }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="hasLairActions"
                        checked={hasLairActions}
                        onChange={(event) => setHasLairActions(event.target.checked)}
                    />
                }
                label="Lair Actions"
            />

            <Button type="submit" variant="contained" style={{ marginTop: '20px' }}>
                Generate Monster
            </Button>
        </form>
    );
};

export default MonsterForm;