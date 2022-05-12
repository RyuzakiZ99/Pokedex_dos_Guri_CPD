const File = require('./helpers/createFile.js')
const DB = require('./helpers/handleDB.js')

const readline = require('readline')
const fs = require('fs')

function createNewDB() {
  let readable = fs.createReadStream('src/dataInput/PokedexData.csv')

  let name = document.getElementById('file-name').value

  let TYPE_1 = document.getElementById('type1').value

  let TYPE_2 = document.getElementById('type2').value

  let fileName = `${name}.db`

  File.create(fileName)

  let info

  var db

  setTimeout(() => {
    db = DB.open(fileName)
  }, 50)

  setTimeout(() => {
    DB.addTable(db)
  }, 150)

  setTimeout(() => {
    const rl = readline.createInterface({
      input: readable,
      output: process.stdout
    })

    rl.on('line', line => {
      info = [
        Code,
        Number,
        Name,
        Gen,
        isLegendary,
        isMythical,
        typeNumber,
        type1,
        type2,
        totalPoints,
        isVariant
      ] = line.split(',')

      if (TYPE_2 == '0') {
        if (info[6] == '1' && info[7] == TYPE_1) {
          DB.addRow(db, info)
        }
      } else if (info[7] == TYPE_1 && info[8] == TYPE_2) {
        DB.addRow(db, info)
      }
    })
  }, 500)

  setTimeout(() => {
    console.log(`Arquivo ${fileName} criado e preenchido!`)
  }, 5000)

  setTimeout(() => {
    DB.close(db)

    let List = document.getElementById('list')
    let fileEntry = document.createElement('div')
    let name = document.createElement('p')

    name.innerText = fileName

    fileEntry.appendChild(name)
    let printButton = document.createElement('button')

    printButton.innerText = 'Imprimir database'
    printButton.setAttribute('onclick', 'printFile(this)')

    fileEntry.appendChild(printButton)

    List.appendChild(fileEntry)

    TYPE_1 = '0'
    TYPE_2 = '0'
    readable = null
  }, 5050)
}

function printFile(element) {
  let fileEntry = element.parentNode

  console.log(fileEntry)

  let fileName = fileEntry.children[0].innerText

  var db

  setTimeout(() => {
    db = DB.open(fileName)
  }, 50)

  setTimeout(() => {
    DB.print(db)
  }, 150)

  setTimeout(() => {
    DB.close(db)
  }, 1500)
}
