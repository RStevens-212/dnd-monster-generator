import jsPDF from 'jspdf';

export const PDFGenerator = ({ monster }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Monster: ${monster.name}`, 10, 10);
    doc.text(`Type: ${monster.type}`, 10, 20);
    doc.text(`Size: ${monster.size}`, 10, 30);
    doc.text(`Challenge Rating: ${monster.cr}`, 10, 40);
    doc.text(`Stats: ${monster.stats}`, 10, 50);
    doc.text(`Resistances: ${monster.resistances.length > 0 ? monster.resistances : 'None'}`, 10, 60);
    doc.text(`Vulnerabilities: ${monster.vulnerabilities.length > 0 ? monster.vulnerabilities : 'None'}`, 10, 70);
    doc.text(`Lair Actions: ${monster.lairActions.length > 0 ? monster.lairActions : 'None'}`, 10, 80);
    // Add more details...
    doc.save(`${monster.name}.pdf`);
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};
