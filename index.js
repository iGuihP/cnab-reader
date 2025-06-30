import path from 'path';
import chalk from 'chalk';

import {
  parseArguments
} from './utils/args.utils.js';
import {
  resolveFilePath,
  readFileAsync,
  writeFileSync
} from './utils/file.utils.js';
import {
  filterBySegment,
  exportToJson,
  searchByCompanyName,
  exportToXlsx
} from './utils/cnab.utils.js';
import {
  printSearchResults,
  printSegmentLines
} from './utils/log.utils.js';


async function main() {
  try {
    const argv = parseArguments();
    const filePath = resolveFilePath(argv.file);

    console.time('Leitura Assíncrona');
    const content = await readFileAsync(filePath);
    console.timeEnd('Leitura Assíncrona');

    const linesData = content.split(/\r?\n/).filter(Boolean);
    const body = linesData.slice(2, -2);

    if (argv['export-json']) {
      const exportData = exportToJson(body);
      const outputFile = path.resolve(process.cwd(), 'cnab_export.json');
      writeFileSync(outputFile, JSON.stringify(exportData, null, 2));
      console.log(chalk.green(`\nExportação concluída: ${outputFile}`));
      return;
    }

    if (argv['export-xlsx']) {
      const exportData = exportToJson(body);
      const outputFile = exportToXlsx(exportData);
      console.log(chalk.green(`\nExportação XLSX concluída: ${outputFile}`));
      return;
    }

    if (argv.search) {
      const results = searchByCompanyName(body, argv.search);
      if (results.length === 0) {
        console.log(chalk.red(`Nenhuma empresa encontrada com o termo: ${argv.search}`));
        return;
      }
      printSearchResults(results, argv.from, argv.to);
      return;
    }

    const filteredLines = filterBySegment(body, argv.segment);
    printSegmentLines(filteredLines, argv.from, argv.to, argv.segment);
  } catch (error) {
    console.error(chalk.red('🚀 ~ ERRO na execução:'), error.message);
  }
}

main();
