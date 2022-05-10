class Pokemon {
  constructor(
    code,
    number,
    name,
    gen,
    isLegendary,
    isMythical,
    typeNumber,
    type1,
    type2,
    isVariant,
    points
  ) {
    this.code = code
    this.name = name
    this.number = number
    this.gen = gen
    if (isLegendary == 0) {
      this.isLegendary = 'Não'
    } else {
      this.isLegendary = 'Sim'
    }
    if (isMythical == 0) {
      this.isMythical = 'Não'
    } else {
      this.isMythical = 'Sim'
    }
    if (typeNumber == 1) {
      this.type1 = type1
      this.type2 = null
    } else {
      this.type1 = type1
      this.type2 = type2
    }
    if (isVariant == 0) {
      this.isVariant = 'Não'
    } else {
      this.isVariant = 'Sim'
    }

    this.points = points

    this.typeNumber = typeNumber
  }

  getTypeDesctription() {
    let types
    if (this.typeNumber == 1) {
      types = `Tipo: ${this.type1}`
    } else {
      types = `Tipo primário: ${this.type1},
      Tipo secundário: ${this.type2},`
    }
    return types
  }

  getRegion() {
    switch (this.gen) {
      case '1':
        return 'Kanto'
      case '2':
        return 'Johto'
      case '3':
        return 'Hoenn'
      case '4':
        return 'Sinnoh'
      case '5':
        return 'Unova'
      case '6':
        return 'Kalos'
      case '7':
        return 'Alola'
      case '8':
        return 'Galar'
    }
  }

  getDescription() {
    let description = `Número: ${this.number},
     Nome: ${this.name}, 
     Geração: ${this.gen}, 
     ${this.getTypeDesctription()}      
     É lendário? ${this.isLegendary}, 
     É mítico? ${this.isMythical}`
    return description
  }
}

module.exports = { class: Pokemon }
