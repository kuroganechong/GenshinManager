<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">N</th>
          <th scope="col">E</th>
          <th scope="col">Q</th>
          <th scope="col">Mora (k)</th>
          <th scope="col">Books</th>
          <th scope="col">Mat</th>
          <th scope="col">Boss</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sum</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ morasum/1000 }}</td>
          <td></td>
        </tr>
        <tr v-for="(char, index) in chars" :key="index">
          <td>{{ char.name }}</td>
          <td>{{ char.talent1 }}</td>
          <td>{{ char.talent2 }}</td>
          <td>{{ char.talent3 }}</td>
          <td>{{ char.costs.mora/1000 }}</td>
          <td>
            <li v-for="(item, index) in char.costs.book" :key="index">
              {{ item.count }} {{ item.name }}
            </li>
          </td>
          <td>
            <li v-for="(item, index) in char.costs.mat" :key="index">
              {{ item.count }} {{ item.name }}
            </li>
          </td>
          <td>
            <li v-for="(item, index) in char.costs.boss" :key="index">
              {{ item.count }} {{ item.name }}
            </li>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

const Classes = require('../classes.js')

async function findCharTalentByName(name) {
  let response
  response = await window.api.findCharTalentByName(name)
  return JSON.parse(response)
}

function calculateTalentCosts(talent1, talent2, talent3, talent_data) {
  let temp = []
  let temp1 = []
  let temp2 = []
  while (talent1 < 9) {
    talent1 = talent1 + 1
    let string = 'lvl' + String(talent1)
    temp.push(talent_data[string])
  }
  while (talent2 < 9) {
    talent2 = talent2 + 1
    let string = 'lvl' + String(talent2)
    temp1.push(talent_data[string])
  }
  while (talent3 < 9) {
    talent3 = talent3 + 1
    let string = 'lvl' + String(talent3)
    temp2.push(talent_data[string])
  }

  let result = new Classes.Talent(0,[],[],[])

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
        result.book.push(book)
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
        result.mat.push(mat)
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
          result.boss.push(boss)
        }
      }
    }
  }

  combine(structuredClone(temp))
  combine(structuredClone(temp1))
  combine(structuredClone(temp2))

  return result
}

export default {
  name: 'CharacterTable',
  data() {
    return {
      chars: []
    }
  },
  computed: {
    morasum() {
      let sum = 0
        for (let i = 0 ; i < this.chars.length; i++) {
          sum += this.chars[i].costs.mora
        }
      return sum
    },
    booksum() {
      let result = []
        for (let i = 0 ; i < this.chars.length; i++) {
          
          let book = this.chars[i].costs.book
          for (let i = 0; i < book.length; i++) {
            if (result.book[i].name == book.name) {
              result.book[i].count += book.count
            }
          }
          result += this.chars[i].costs.book
        }
      return result
    },
    matsum() {
      let sum = 0
        for (let i = 0 ; i < this.chars.length; i++) {
          sum += this.chars[i].costs.mora
        }
      return sum
    },
    bosssum() {
      let sum = 0
        for (let i = 0 ; i < this.chars.length; i++) {
          sum += this.chars[i].costs.mora
        }
      return sum
    }
  },
  async created() {
    const response = await window.api.databaseGetAllCharacter()
    const data = JSON.parse(response)
    for (let char of data) {
      const talent_response = await findCharTalentByName(char.name)
      let talent_costs = talent_response.costs
      char.costs = calculateTalentCosts(char.talent1, char.talent2, char.talent3, structuredClone(talent_costs))
    }
    this.chars = data;
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
