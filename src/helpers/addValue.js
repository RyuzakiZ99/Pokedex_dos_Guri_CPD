const sqlite3 = require('sqlite3').verbose()

function addPokemon(db_name, info) {
  return new Promise((resolve, reject) => {
    var CLEAR = true
    console.log('Passo 9')

    const relativePath = `src/data/${db_name}`

    const db = new sqlite3.Database(
      relativePath,
      sqlite3.OPEN_READWRITE,
      err => {
        if (err) {
          CLEAR = false
          return console.error(err.message)
        }

        console.log('Conecxão sucedida!')
        console.log('Passo 10')
      }
    )

    const sql = `INSERT INTO Pokemon (code, number, name, generation, is_legendary, is_mythical, number_of_types, type_1, type_2, is_variant, points)
                  VALUES(?,?,?,?,?,?,?,?,?,?,?)`

    db.run(sql, info, err => {
      console.log('Passo 11')
      if (err) {
        console.error(err)
        CLEAR = false
        reject(CLEAR)
      }
      resolve(CLEAR)
    })

    db.close(err => {
      if (err) {
        console.error(err.message)
        CLEAR = false
        return
      }
    })
  })
}

async function confirmAddition(db_name, info) {
  let confirmation = await addPokemon(db_name, info)
  if (confirmation) {
    console.log('Pokemon adicionado com sucesso!')
    console.log('Passo 12')
  } else {
    console.log('Erro na adição.')
  }
  return confirmation
}

module.exports = {
  add: confirmAddition
}
