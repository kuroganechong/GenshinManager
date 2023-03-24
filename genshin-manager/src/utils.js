module.exports = {
  Character: class Character {
    constructor(name, talent1, talent2, talent3) {
      this.name = name;
      this.talent1 = talent1;
      this.talent2 = talent2;
      this.talent3 = talent3;
    }
  },
  Talent: class Talent {
    constructor(mora, book, mat, boss) {
      this.mora = mora;
      this.book = book;
      this.mat = mat;
      this.boss = boss;
    }
  },
  calculateTalentCosts(talent1, talent2, talent3, talent_data) {
    let temp = []
    let temp1 = []
    let temp2 = []
    while (talent1 < 9) {
      talent1 = talent1 + 1
      let string = 'lvl' + String(talent1)
      temp.push(structuredClone(talent_data[string]))
    }
    while (talent2 < 9) {
      talent2 = talent2 + 1
      let string = 'lvl' + String(talent2)
      temp1.push(structuredClone(talent_data[string]))
    }
    while (talent3 < 9) {
      talent3 = talent3 + 1
      let string = 'lvl' + String(talent3)
      temp2.push(structuredClone(talent_data[string]))
    }

    let result = new this.Talent(0,[],[],[])

    function combine(arr) {
      for (let item of arr) {
        result.mora += item[0].count

        let book = item[1]
        let isCounted = false
        for (let i = 0; i < result.book.length; i++) {
          if (result.book[i].name == book.name) {
            result.book[i].count += book.count
            isCounted = true
          }
        }
        if (!isCounted) {
          result.book.push(structuredClone(book))
        }

        let mat = item[2]
        isCounted = false
        for (let i = 0; i < result.mat.length; i++) {
          if (result.mat[i].name == mat.name) {
            result.mat[i].count += mat.count
            isCounted = true
          }
        }
        if (!isCounted) {
          result.mat.push(structuredClone(mat))
        }

        if (item.length > 3) {
          let boss = item[3]
          isCounted = false
          for (let i = 0; i < result.boss.length; i++) {
            if (result.boss[i].name == boss.name) {
              result.boss[i].count += boss.count
              isCounted = true
            }
          }
          if (!isCounted) {
            result.boss.push(structuredClone(boss))
          }
        }
      }
    }

    combine(structuredClone(temp))
    combine(structuredClone(temp1))
    combine(structuredClone(temp2))

    return result
  },
  async getRedirectedURL(URL) {
    const requestImg = new Request(URL)
    const response = await fetch(requestImg)
    return response.url
  },
  async fetchItemDetailsFromSum(object) {
    let temp = {}
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        const response = await (async (name) => {
          let response
          response = await window.api.findMatByName(name)
          return JSON.parse(response)
        })(element.name);
        let imageurl = await this.getRedirectedURL(response.images.redirect)
        let newimageurl = imageurl.split('.png')[0] + '.png'
        temp[response.name] = {
          images: newimageurl,
          rarity: response.rarity,
          source: response.source,
        }
      }
    }
    return structuredClone(temp)
  },
  async fetchItemDetails(name) {
    let temp = {}
    const response = JSON.parse(await window.api.findMatByName(name))
    let imageurl = await this.getRedirectedURL(response.images.redirect)
    let newimageurl = imageurl.split('.png')[0] + '.png'
    temp[response.name] = {
      images: newimageurl,
      rarity: response.rarity,
      source: response.source,
    }
    return structuredClone(temp)
  }
}