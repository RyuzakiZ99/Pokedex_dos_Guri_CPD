const sqlite3 = require('sqlite3').verbose()

function addTable(db_name) {
  return new Promise((resolve, reject) => {
    var CLEAR = true
    console.log('Passo 13')
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
      }
    )

    const sql = `SELECT * FROM Pokemon`

    db.all(sql, [], (err, rows) => {
      console.log('Passo 14')
      if (err) {
        CLEAR = false
        reject(CLEAR)
      }
      rows.forEach(row => {
        console.log(row)
      })
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

async function confirmPrint(db_name) {
  let confirmation = await addTable(db_name)
  if (confirmation) {
    console.log('Tabela impressa com sucesso!')
  } else {
    console.log('Erro na impressão da tabela')
  }
  return confirmation
}

module.exports = {
  confirm: confirmPrint
}
