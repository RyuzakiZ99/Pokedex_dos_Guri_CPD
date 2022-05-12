const sqlite3 = require('sqlite3').verbose()

function addTable(db_name) {
  return new Promise((resolve, reject) => {
    console.log('Passo 4')
    const relativePath = `src/data/${db_name}`
    var CLEAR = true
    const db = new sqlite3.Database(
      relativePath,
      sqlite3.OPEN_READWRITE,
      err => {
        if (err) {
          CLEAR = false
          return console.error(err.message)
        }
        console.log('Conecxão sucedida!')
        console.log('Passo 5')
      }
    )

    db.run(
      `CREATE TABLE Pokemon (code, number, name, generation, is_legendary, is_mythical, number_of_types, type_1, type_2, is_variant, points)`,
      err => {
        console.log('Passo 6')
        if (err) {
          CLEAR = false
          reject(CLEAR)
        }
        resolve(CLEAR)
      }
    )

    db.close(err => {
      console.log('passo 7')
      if (err) {
        console.error(err.message)
        return
      }
    })
  })
}

async function confirmTable(db_name) {
  let confirmation = await addTable(db_name)
  if (confirmation) {
    console.log('Tabela criada com sucesso!')
    console.log('Passo 8')
  } else {
    console.log('Erro na criação da tabela')
  }
  return confirmation
}

module.exports = {
  create: confirmTable
}
