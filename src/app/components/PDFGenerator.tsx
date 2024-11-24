import { Button } from '@mui/material';
import jsPDF from 'jspdf';

export const PDFGenerator = ({ monster }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Monster: ${monster.name}`, 10, 10);
    doc.text(`Type: ${monster.type}`, 10, 20);
    doc.text(`Size: ${monster.size}`, 10, 30);
    doc.text(`Challenge Rating: ${monster.cr}`, 10, 40);
    doc.text(`Strength: ${monster.stats.strength}`, 10, 50);
    doc.text(`Dexterity: ${monster.stats.dexterity}`, 10, 60);
    doc.text(`Constitution: ${monster.stats.constitution}`, 10, 70);
    doc.text(`Wisdom: ${monster.stats.wisdom}`, 10, 80);
    doc.text(`Intelligence: ${monster.stats.intelligence}`, 10, 90);
    doc.text(`Charisma: ${monster.stats.charisma}`, 10, 100);
    doc.text(`Resistances: ${monster.resistances && monster.resistances.length > 0 ? monster.resistances : 'None'}`, 10, 110);
    doc.text(`Vulnerabilities: ${monster.vulnerabilities && monster.vulnerabilities.length > 0 ? monster.vulnerabilities : 'None'}`, 10, 120);
    doc.text(`Legendary Resistances: ${monster.legendaryResistances | 0}`, 10, 130);
    doc.text(`Actions: ${monster.actions}`, 10, 140);
    doc.text(`Lair Actions: ${monster.lairActions.length > 0 ? monster.lairActions : 'None'}`, 10, 180);
    // Add more details...
    doc.save(`${monster.name}.pdf`);
  };

  return <Button variant='contained' onClick={handleDownload}>Download PDF</Button>;
};
