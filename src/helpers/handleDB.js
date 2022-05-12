const sqlite3 = require('sqlite3')

function addTable(db) {
  return new Promise((resolve, reject) => {
    var CLEAR = true

    db.run(
      `CREATE TABLE Pokemon (code, number, name, generation, is_legendary, is_mythical, number_of_types, type_1, type_2, points, is_variant)`,
      err => {
        if (err) {
          reject(CLEAR)
        }
        resolve(CLEAR)
      }
    )
  })
}

async function confirmTable(db) {
  let confirmation = await addTable(db)
  if (confirmation) {
    console.log('Tabela criada com sucesso!')
  } else {
    console.log('Erro na criação da tabela')
  }
  return confirmation
}

function openDB(db_name) {
  const relativePath = `src/data/${db_name}`

  const db = new sqlite3.Database(relativePath, sqlite3.OPEN_READWRITE, err => {
    if (err) {
      CLEAR = false
      console.log('Erro na abertura...')
      console.error(err.message)
      return false
    }
    console.log('Database aberta com sucesso!')
  })
  return db
}

function addPokemon(db, info) {
  return new Promise((resolve, reject) => {
    var CLEAR = true

    const sql = `INSERT INTO Pokemon (code, number, name, generation, is_legendary, is_mythical, number_of_types, type_1, type_2, points, is_variant)
                  VALUES(?,?,?,?,?,?,?,?,?,?,?)`

    db.run(sql, info, err => {
      if (err) {
        console.error(err)
        CLEAR = false
        reject(CLEAR)
      }
      resolve(CLEAR)
    })
  })
}

async function confirmAddition(db_name, info) {
  let confirmation = await addPokemon(db_name, info)
  if (confirmation) {
    console.log('Pokemon adicionado com sucesso!')
  } else {
    console.log('Erro na adição.')
  }
  return confirmation
}

function closeDB(db) {
  db.close(err => {
    if (err) {
      console.log('Erro no fechamento...')
      console.error(err.message)
      return false
    }
    console.log('Fechando...')
    return db
  })
}

function printTable(db) {
  return new Promise((resolve, reject) => {
    var CLEAR = true
    console.log()
    const sql = `SELECT * FROM Pokemon`

    db.all(sql, [], (err, rows) => {
      if (err) {
        CLEAR = false
        reject(CLEAR)
      }
      rows.forEach(row => {
        console.log(row)
      })
      resolve(CLEAR)
    })
  })
}

async function confirmPrint(db) {
  let confirmation = await printTable(db)
  if (confirmation) {
    console.log('Tabela impressa com sucesso!')
  } else {
    console.log('Erro na impressão da tabela')
  }
  return confirmation
}

// function searchPokemon(db, info) {
//   return new Promise((resolve, reject) => {
//     var CLEAR = true

//     const sql = `INSERT INTO Pokemon (code, number, name, generation, is_legendary, is_mythical, number_of_types, type_1, type_2, points, is_variant)
//                   VALUES(?,?,?,?,?,?,?,?,?,?,?)`

//     db.run(sql, info, err => {
//       if (err) {
//         console.error(err)
//         CLEAR = false
//         reject(CLEAR)
//       }
//       resolve(CLEAR)
//     })
//   })
// }

// async function confirmAddition(db_name, info) {
//   let confirmation = await addPokemon(db_name, info)
//   if (confirmation) {
//     console.log('Pokemon adicionado com sucesso!')
//   } else {
//     console.log('Erro na adição.')
//   }
//   return confirmation
// }

module.exports = {
  open: openDB,
  close: closeDB,
  print: confirmPrint,
  addRow: confirmAddition,
  addTable: confirmTable
}
