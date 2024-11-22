import jsPDF from 'jspdf';

export const PDFGenerator = ({ monster }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Monster: ${monster.name}`, 10, 10);
    doc.text(`Type: ${monster.type}`, 10, 20);
    // Add more details...
    doc.save(`${monster.name}.pdf`);
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};
