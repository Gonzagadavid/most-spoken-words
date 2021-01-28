const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

function lerDiretorio (caminho) {
  return new Promise((resolve, reject) => {
    try {
      const arquivos = fs.readdirSync(caminho).map(arquivo => path.join(caminho, arquivo))
      resolve(arquivos)
    } catch (e) {
      reject(e)
    }
  })
}

function elementosTerminadoCom (padrão) {
  return function (array) {
    return array.filter(arquivo => arquivo.endsWith(padrão))
  }
}

function lerArquivo (caminho) {
  return new Promise((resolve, reject) => {
    try {
      const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
      resolve(conteudo.toString())
    } catch (e) {
      reject(e)
    }
  })
}

function lerArquivos (caminhos) {
  return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function removerElementosSeVazio (array) {
  return array.filter(elemento => elemento.trim())
}

function removerElementosSeIncluirNumeros (array) {
  return array.filter(elemento => isNaN(parseInt(elemento)))
}

function removerSimbolos (simbolos) {
  return function (array) {
    return array.map(elemento => {
      return simbolos.reduce((acc, crr) => {
        return acc.split(crr).join('')
      }, elemento)
    })
  }
}

function mesclarElementos (conteudo) {
  return conteudo.join(' ')
}

function separarTextoPor (simbolo) {
  return function (texto) {
    return texto.split(simbolo)
  }
}

function agruparElementos (palavras) {
  return Object.values(palavras.reduce((acc, palavra) => {
    const el = palavra.toLowerCase()
    const qtde = acc[el] ? acc[el].qtde + 1 : 1
    acc[el] = { elementos: el, qtde }
    return acc
  }, {}))
}

function ordenarPorAtributoNumerico (attr, ordem = 'asc') {
  return function (array) {
    const asc = (a, b) => b[attr] - a[attr]
    const desc = (a, b) => b[attr] - a[attr]
    return [...array].sort(ordem === 'asc' ? asc : desc)
  }
}

function postarConteudoJson (caminho) {
  return function (conteudo) {
    fs.appendFile(caminho, JSON.stringify(conteudo), (err) => {
      if (err) throw err
      console.log('The "data to append" was appended to file!')
    })
  }
}

module.exports = {
  lerDiretorio,
  elementosTerminadoCom,
  lerArquivos,
  removerElementosSeVazio,
  removerElementosSeIcluir,
  removerElementosSeIncluirNumeros,
  removerSimbolos,
  mesclarElementos,
  separarTextoPor,
  agruparElementos,
  ordenarPorAtributoNumerico,
  postarConteudoJson
}
