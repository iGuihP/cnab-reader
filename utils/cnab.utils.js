import XLSX from 'xlsx';
import path from 'path';

export function getSegment(lineData) {
  return lineData[13] ? lineData[13].toUpperCase() : '';
}

export function extractCompanyDataFromSegmentQ(lineData, fileLine) {
  return {
    companyName: lineData.substring(33, 73).trim(),
    address: {
      street: lineData.substring(73, 113).trim(),
      neighborhood: lineData.substring(113, 128).trim(),
      zipCode: lineData.substring(128, 136).trim(),
      city: lineData.substring(136, 151).trim(),
      state: lineData.substring(151, 153).trim(),
    },
    fileLine,
  };
}

export function filterBySegment(linesData, segment) {
  const segmentUpper = segment.toUpperCase();
  return linesData.filter((line) => getSegment(line) === segmentUpper);
}

export function exportToJson(linesData) {
  return linesData
    .filter((line) => getSegment(line) === 'Q')
    .map((lineData, idx) => extractCompanyDataFromSegmentQ(lineData, idx + 3));
}

export function exportToXlsx(data, outputFileName = 'cnab_export.xlsx') {
  const flatData = data.map(({ companyName, address, fileLine }) => ({
    Empresa: companyName,
    Rua: address.street,
    Bairro: address.neighborhood,
    CEP: address.zipCode,
    Cidade: address.city,
    Estado: address.state,
    LinhaArquivo: fileLine,
  }));

  const worksheet = XLSX.utils.json_to_sheet(flatData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Segmento Q');

  const outputPath = path.resolve(process.cwd(), outputFileName);
  XLSX.writeFile(workbook, outputPath);

  return outputPath;
}

export function searchByCompanyName(linesData, searchTerm) {
  const upperTerm = searchTerm.toUpperCase();

  return linesData.reduce((acc, lineData, idx) => {
    const segment = getSegment(lineData);
    if (segment !== 'Q') return acc;

    const companyName = extractCompanyDataFromSegmentQ(lineData, idx).companyName;

    if (companyName.toUpperCase().includes(upperTerm)) {
      acc.push({
        companyName,
        line: idx + 3,
        segment,
        content: lineData,
      });
    }
    return acc;
  }, []);
}
