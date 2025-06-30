import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const CLI_OPTIONS = {
  usage: 'Uso: $0 [options]',
  options: {
    from: {
      alias: 'f',
      describe: 'posição inicial de pesquisa da linha do CNAB',
      type: 'number',
    },
    to: {
      alias: 't',
      describe: 'posição final de pesquisa da linha do CNAB',
      type: 'number',
    },
    segment: {
      alias: 's',
      describe: 'tipo de segmento',
      type: 'string',
    },
    file: {
      alias: 'filepath',
      describe: 'caminho do arquivo CNAB',
      type: 'string',
    },
    search: {
      alias: 'searchCompany',
      describe: 'nome da empresa a ser buscado',
      type: 'string',
    },
    exportJson: {
      alias: 'export-json',
      describe: 'exporta as empresas e endereços do segmento Q para JSON',
      type: 'boolean',
    },
  },
};

export function parseArguments() {
  return yargs(hideBin(process.argv))
    .usage(CLI_OPTIONS.usage)
    .options(CLI_OPTIONS.options)
    .check((args) => {
      const hasSearch = Boolean(args.search);
      const hasExportJson = Boolean(args['export-json']);
      const hasSegmentRange =
        args.from !== undefined && args.to !== undefined && args.segment !== undefined;

      if (!hasSearch && !hasExportJson && !hasSegmentRange) {
        throw new Error(
          'Informe --search, --export-json ou todos os parâmetros --from, --to e --segment'
        );
      }
      return true;
    })
    .parse();
}
