import chalk from 'chalk';

export function printSearchResults(results, from, to) {
  if (results.length === 0) {
    console.log(chalk.red('Nenhuma empresa encontrada com o termo pesquisado.'));
    return;
  }

  results.forEach(({ companyName, line, segment, content }) => {
    console.log(chalk.green(`\nEmpresa encontrada: ${companyName}`));
    console.log(`Segmento: ${segment}`);
    console.log(`Linha no arquivo: ${line}`);

    if (from && to) {
      const snippet = content.substring(from - 1, to);
      console.log(`Trecho isolado: ${chalk.inverse(snippet)} (de ${from - 1} até ${to})\n`);
      console.log(
        `Linha completa:\n${content.substring(0, from - 1)}${chalk.inverse(snippet)}${content.substring(to)}`
      );
    } else {
      console.log(`Linha completa:\n${content}`);
    }
  });
}

export function printSegmentLines(linesData, from, to, segment) {
  const segmentUpper = segment.toUpperCase();

  if (linesData.length === 0) {
    console.log(chalk.red(`Nenhuma linha do segmento ${segmentUpper} encontrada.`));
    return;
  }

  linesData.forEach((lineData, idx) => {
    const companyName = segmentUpper === 'Q' ? lineData.substring(33, 74).trim() : null;
    const snippet = lineData.substring(from - 1, to);

    console.log(`
${chalk.yellow(`----- Segmento CNAB ${segmentUpper} (linha ${idx + 1}) -----`)}

        ${companyName ? `Empresa: ${chalk.green(companyName)}\n` : ''}
        Posição de: ${chalk.inverse(String(from))}
        Posição até: ${chalk.inverse(String(to))}

        Trecho isolado: ${chalk.inverse(snippet)}

        Linha completa:
        ${lineData.substring(0, from - 1)}${chalk.inverse(snippet)}${lineData.substring(to)}

${chalk.yellow(`----- FIM -----`)}
    `);
  });
}
