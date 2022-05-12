const fs = require('fs')

function createFile(file_name) {
  return new Promise((resolve, reject) => {
    var CLEAR
    fs.writeFile(`src/data/${file_name}`, '', err => {
      CLEAR = true
      if (err) {
        console.error(err.message)
        console.log('passo 1 erro')
        CLEAR = false
        reject(CLEAR)
      }
      console.log('Passo 1')
      resolve(CLEAR)
    })
  })
}

async function confirmFile(file_name) {
  let confirmation = await createFile(file_name)
  if (confirmation) {
    console.log('Passo 2')
    console.log('Arquivo criado com sucesso!')
  } else {
    console.log('Erro na criação do arquivo')
  }
  console.log('Passo 3')
  return confirmation
}

module.exports = {
  create: confirmFile
}
