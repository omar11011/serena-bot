const reemplazos = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ü': 'u',
    'ñ': 'n',
  }

module.exports = word => {

  word = word.trim().replace(/[áéíóúüñ]/g, match => reemplazos[match] || match)
  
  return word

}  