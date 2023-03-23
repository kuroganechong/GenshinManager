<template>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          Summary
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="row">
            <div class="col-sm-3">
              <div class="card">
                <div class="card-header">
                  Mora
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">{{ morasum/1000 }}k</li>
                </ul>
              </div>
            </div>
              
            <div class="col-sm-3">
              <div class="card">
                <div class="card-header">
                  Book
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" v-for="(item, index) in booksum" :key="index">
                    {{ item.name }}: {{ item.count }}
                  </li>
                </ul>
              </div>
            </div>
              
            <div class="col-sm-3">
              <div class="card">
                <div class="card-header">
                  Mat
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" v-for="(item, index) in matsum" :key="index">
                    {{ item.name }}: {{ item.count }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-sm-3">
              <div class="card">
                <div class="card-header">
                  Boss
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" v-for="(item, index) in bosssum" :key="index">
                    {{ item.name }}: {{ item.count }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          Details
        </button>
      </h2>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">N</th>
                  <th scope="col">E</th>
                  <th scope="col">Q</th>
                  <th scope="col">Mora</th>
                  <th scope="col">Books</th>
                  <th scope="col">Mat</th>
                  <th scope="col">Boss</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(char, index) in chars" :key="index">
                  <td>{{ char.name }}</td>
                  <td>{{ char.talent1 }}</td>
                  <td>{{ char.talent2 }}</td>
                  <td>{{ char.talent3 }}</td>
                  <td>{{ char.costs.mora/1000 }}k</td>
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
        </div>
      </div>
    </div>
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
}

export default {
  name: 'CharacterTable',
  data() {
    return {
      chars: [],
      sumbooks: [],
      summats: [],
      sumboss: []
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
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == book[i].name) {
              result[j].count += book[i].count
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone(book[i]))
          }
        }
      }
      return result
    },
    matsum() {
      let result = []
      for (let i = 0 ; i < this.chars.length; i++) {
        let mat = this.chars[i].costs.mat
        for (let i = 0; i < mat.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == mat[i].name) {
              result[j].count += mat[i].count
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone(mat[i]))
          }
        }
      }
      return result
    },
    bosssum() {
      let result = []
      for (let i = 0 ; i < this.chars.length; i++) {
        let boss = this.chars[i].costs.boss
        for (let i = 0; i < boss.length; i++) {
          let isCounted = false
          for (let j = 0; j < result.length; j++){
            if (result[j].name == boss[i].name) {
              result[j].count += boss[i].count
              isCounted = true
            }
          }
          if(!isCounted){
            result.push(structuredClone(boss[i]))
          }
        }
      }
      return result
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
    console.log(this.chars)
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
