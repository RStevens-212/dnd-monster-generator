'use client'
import MonsterForm from './components/MonsterForm';
import { MonsterCard } from './components/MonsterCard';
import { PDFGenerator } from './components/PDFGenerator';
import { useState } from 'react';

export default function Home() {
  const [monster, setMonster] = useState(null);

  const handleSubmit = async (formData: {
    type: string;
    size?: string;
    minCR: number;
    maxCR: number;
    hasLairActions?: boolean;
    selectedResistances?: string[];
    vulnerabilities?: string[];
  }) => {
  
    // Ensure defaults are applied
    const minCR = formData.minCR || 0.25;
    const maxCR = formData.maxCR || 30;
    const selectedType = formData.type || 'Any';
    const selectedSize = formData.size || 'Any';
    const hasLairActions = formData.hasLairActions || false;
    const selectedResistances = formData.selectedResistances || undefined;
    const vulnerabilities = formData.vulnerabilities || undefined;
  
    // Send data to the backend
    const response = await fetch('/api/generateMonster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: selectedType,
        size: selectedSize,
        minCR,
        maxCR,
        hasLairActions,
        resistances: selectedResistances, 
        vulnerabilities: vulnerabilities,
      }),
    });
    console.log(response);
  
    // Handle response
    if (response.ok) {
      const generatedMonster = await response.json();
      console.log('Generated Monster:', generatedMonster);
      setMonster(generatedMonster); // Update state with the generated monster
    } else {
      console.error('Error generating monster:', response.statusText);
    }
  };
    

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>D&D 5E Monster Generator</h1>
      <p style={{ textAlign: 'center' }}>
        Create custom monsters tailored to your campaign. Define the type, challenge rating, size, and other parameters.
      </p>

      {/* Pass the handleFormSubmit as onSubmit to the MonsterForm component */}
      <MonsterForm onSubmit={handleSubmit} />

      {/* If a monster is generated, show it in a MonsterCard and allow PDF generation */}
      {monster && (
        <>
          <MonsterCard monster={monster} />
          <PDFGenerator monster={monster} />
        </>
      )}
    </main>
  );
}