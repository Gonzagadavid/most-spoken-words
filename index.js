const path = require('path')
const fn = require('./funcoes')

const caminhoJson = path.join('./arquivos.json')
const caminho = path.join(__dirname, './legendas')
const simbolos = [
  '.', '?', '-', '_', '♪', '"', '<i>', '</i>',
  '<b>', '</b>', '\r', '[', ']', '(', ')', ','
]

fn.lerDiretorio(caminho)
  .then(fn.elementosTerminadoCom('.srt'))
  .then(fn.lerArquivos)
  .then(fn.mesclarElementos)
  .then(fn.separarTextoPor('\n'))
  .then(fn.removerElementosSeVazio)
  .then(fn.removerElementosSeIncluirNumeros)
  .then(fn.removerSimbolos(simbolos))
  .then(fn.mesclarElementos)
  .then(fn.separarTextoPor(' '))
  .then(fn.removerElementosSeVazio)
  .then(fn.removerElementosSeIncluirNumeros)
  .then(fn.agruparElementos)
  .then(fn.ordenarPorAtributoNumerico('qtde', 'desc'))
  // .then(fn.postarConteudoJson(caminhoJson))
  .then(console.log)