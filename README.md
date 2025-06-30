# Desafio técnico - Leitor de Arquivos CNAB

Ferramenta de linha de comando (CLI) para leitura, filtragem e exportação de dados de arquivos CNAB (ex: arquivos de retorno bancário). Permite:

- Buscar empresas por nome
- Isolar trechos por posição em segmentos específicos
- Exportar dados do segmento Q para JSON e XLSX

```bash
node index.js
Uso: index.js [options]

      --help                       Show help                           [boolean]
      --version                    Show version number                 [boolean]
  -f, --from                       posição inicial de pesquisa da linha do CNAB
                                                                        [number]
  -t, --to                         posição final de pesquisa da linha do CNAB
                                                                        [number]
  -s, --segment                    tipo de segmento                     [string]
      --file, --filepath           caminho do arquivo CNAB              [string]
      --search, --searchCompany    nome da empresa a ser buscado        [string]
      --exportJson, --export-json  exporta as empresas e endereços do segmento Q
                                    para JSON                          [boolean]
      --exportXlsx, --export-xlsx  exporta as empresas e endereços do segmento Q
                                    para XLSX                          [boolean]

Exemplos:
  node index.js -f 21 -t 34 -s q
```

## 1. Buscar nome da empresa (segmento Q)
```bash
node index.js --search "Transportadora"
```

## 2. Buscar nome da empresa (segmento Q)
```bash
node ndex.js --export-json
```

## 3. Exportar empresas do segmento Q para Excel (XLSX)
```bash
node ndex.js --export-xlsx
```

## 4. Destacar trecho
```bash
node ndex.js --from 33 --to 73 --s Q
```