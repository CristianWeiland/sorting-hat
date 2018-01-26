<template>
  <div v-if="!authenticated" align="center">{{msg}}
    <div class="col-sm-4">
      <form v-on:submit.prevent ="authenticate()">
        <label style="margin-top: 50px">Usuário</label>
        <input class="form-control form-group" v-model="username"></input>
        <label class="form-group">Password</label>
        <input type="password" class="form-control form-group" v-model="password"></input>
        <button class="btn btn-secondary">Fazer Login</button>
      </form>
    </div>
  </div>
  <div v-else>
    <h1 class="blue" style="margin-top: 20px; z-index: 1001; position: relative">Chapéu Seletor RDUS</h1>
    <div style="text-align: center; margin-top: -60px">
        <img style="width: 30%" src="../assets/imgs/sorting-hat.jpg"></img>
    </div>
    <div class="content" style="padding: 50px; padding-top: 0px ">

      <div align="center">
        <!-- TODO: Descobir porque a tag form atualiza a página... -->
        <!-- <form class="col-sm-4"> -->
        <div class="col-sm-4">
          <label class="form-group">Maior diferença de média de idades</label>
          <input type="text" class="form-control form-group" v-model="avgAgeDiff"></input>
          <label class="form-group">Maior número de tentativas</label>
          <input type="number" class="form-control form-group" v-model="maxCount"></input>
          <button  v-on:click="redraw()" class="btn btn-secondary" style="margin-bottom: 50px">Sortear</button>
        <!-- </form>-->

          <div>
            <label>Maior diferença entre idades: {{ this.avgAgeDifference().toFixed(2) }}</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3">
          <h3 style="margin-bottom: 20px; text-align: center">Grifinória</h3>
          <campers-table :campers="gryffindors" :team="'Gryffindor'" :resume="true" @averageAgeUpdate="avgAgeUpdate" @totalAgeUpdate="totalAgeUpdate"></campers-table>
        </div>
        <div class="col-sm-3">
          <h3 style="margin-bottom: 20px; text-align: center">Sonserina</h3>
          <campers-table :campers="slytherins" :team="'Slytherin'" :resume="true" @averageAgeUpdate="avgAgeUpdate" @totalAgeUpdate="totalAgeUpdate"></campers-table>
        </div>
        <div class="col-sm-3">
          <h3 style="margin-bottom: 20px; text-align: center">Lufa-Lufa</h3>
          <campers-table :campers="hufflepuffs" :team="'Hufflepuff'" :resume="true" @averageAgeUpdate="avgAgeUpdate" @totalAgeUpdate="totalAgeUpdate"></campers-table>
        </div>
        <div class="col-sm-3">
          <h3 style="margin-bottom: 20px; text-align: center">Ravenclaw</h3>
          <campers-table :campers="ravenclaws" :team="'Ravenclaw'" :resume="true" @averageAgeUpdate="avgAgeUpdate" @totalAgeUpdate="totalAgeUpdate"></campers-table>
        </div>
      </div>

      <!--
      <div>
        <bar-chart v-if="!refreshBarChart" :data="barChartData" :options="barChartOpts"></bar-chart>
      </div>
      -->

      <div class="row">
        <div class="col-sm-6">
          <h3 style="margin-bottom: 20px; text-align: center">Pias:</h3>
          <campers-table :campers="males"></campers-table>
        </div>
        <div class="col-sm-6">
          <h3 style="margin-bottom: 20px; text-align: center">Gurias:</h3>
          <campers-table :campers="females"></campers-table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import CampersTable from './CampersTable.vue';
import Campers from '../data/campers';

export default {
  name: 'home',
  components: {
    BarChart,
    CampersTable,
  },
  data() {
    const teams = [ [], [], [], [] ];

    return {
      males: Campers.filter((camper) => camper.gender === 'M'),
      females: Campers.filter((camper) => camper.gender === 'F'),
      teams,
      gryffindors: teams[0],
      slytherins: teams[1],
      hufflepuffs: teams[2],
      ravenclaws: teams[3],
      teamsIndex: ['gryffindors', 'slytherins', 'hufflepuffs', 'ravenclaws'],
      avgAges: [0, 0, 0, 0],
      totalAges: [0, 0, 0, 0],
      barChartData: {
        labels: ['Grifinória', 'Sonserina', 'Lufa-Lufa', 'Corvinal'],
        datasets: [
          {
            label: 'Somatório de Idades',
            backgroundColor: '#f87979',
            data: [0, 0, 0, 0]
          }, 
          {
            label: 'Média de Idades',
            backgroundColor: '#000',
            data: [40, 20, 0, 0]
          }
        ]
      },
      barChartOpts: {},
      refreshBarChart: false,
      authenticated: false,
      username: '',
      password: '',
      msg: '',
      users: ['Ramon'],
      passwords: ['ramon123'],
      avgAgeDiff: 1,
      maxCount: 100,
    };
  },
  mounted() {
    this.redraw();
  },
  methods: {
    redraw() {
      const maxAvgDiff = this.avgAgeDiff ? this.avgAgeDiff : 1;
      const maxCount = this.maxCount ? this.maxCount : 100;

      this.createTeams();
      let counter = 0;
      while(this.avgAgeDifference() > maxAvgDiff && counter < maxCount) {
        this.createTeams();
        console.log(`Avg is ${this.avgAgeDifference()}`);
        console.log(counter);
        counter += 1;
      }
    },
    authenticate() {
      if (this.users.some((username) => username === this.username) && this.passwords.some((password) => password === this.password)) {
        this.authenticated = true;
      } else {
        this.msg = 'Usuário ou senha inválidos. Se vc não tem um, peça para o Cristian :)';
      }
    },
    updateCharts(teamIdx, data, datasetIdx) {
      this.barChartData.datasets[datasetIdx].data[teamIdx] = data;
      this.refreshBarChart = true;
      this.refreshBarChart = false;
    },
    teamIdx(team) {
      if (team === 'Gryffindor') return 0;
      if (team === 'Slytherin') return 1;
      if (team === 'Hufflepuff') return 2;
      if (team === 'Ravenclaw') return 3;
    },
    avgAgeDifference() {
      const biggestTeamAgeAvg = this.teams.reduce((acc1, team) => {
        const avg = team.reduce((acc2, camper) => acc2 + camper.age, 0) / team.length;
        return acc1 > avg ? acc1 : avg;
      }, 0);

      const smallestTeamAgeAvg = this.teams.reduce((acc1, team) => {
        const avg = team.reduce((acc2, camper) => acc2 + camper.age, 0) / team.length;
        return acc1 > avg ? avg : acc1;
      }, 100);

      return biggestTeamAgeAvg - smallestTeamAgeAvg;
    },
    totalAgeUpdate(props) {
      if (!props) return;
      if (props.totalAge && !isNaN(props.totalAge)) {
        this.updateCharts(this.teamIdx(props.team), parseFloat(props.totalAge), 0);
      }
    },
    avgAgeUpdate(props) {
      if (!props) return;
      if (props.averageAge && !isNaN(props.averageAge)) {
        this.updateCharts(this.teamIdx(props.team), parseFloat(props.averageAge), 1);
      }
    },
    createTeams() {
      this.teams.forEach((team) => {
        while(team.length) team.pop();
      });
      this.males = Campers.filter((camper) => camper.gender === 'M');
      this.females = Campers.filter((camper) => camper.gender === 'F');

      this.sortTeams(this.males);
      this.sortTeams(this.females);
      this.fixUnbalancedTeams();
    },
    utmostTeams() {
      const biggestTeam = this.teams.reduce((biggest, team) => team.length > biggest.length ? team : biggest, this.teams[0]);
      const smallestTeam = this.teams.reduce((smallest, team) => team.length < smallest.length ? team : smallest, this.teams[0]);
      return { biggestTeam, smallestTeam };
    },
    fixUnbalancedTeams() {
      let teams = this.utmostTeams();
      while (teams.biggestTeam.length - teams.smallestTeam.length > 1) {
        teams.smallestTeam.push(teams.biggestTeam.pop());
        teams = this.utmostTeams();
      }
    },
    sortTeams(arr) {
      // First, we have to sort the array in decrescent age order.
      arr.sort((a, b) => {
        return b.age - a.age;
      });

      // Now we have to separate into n teams.
      const n = 4;
      const teams = [[], [], [], []];

      let i, j;
      for (i = 0; i < arr.length; i += 4) {
        if (i + 4 > arr.length) break;
        let used = [];
        for (j = 0; j < 4; ++j) {
          let lastElement = arr[arr.length - i - j - 1];
          let random = Math.floor(Math.random() * 4);
          while (used.some((el) => random === el)) {
            random = Math.floor(Math.random() * 4);
          }
          used.push(random);
          teams[random].push(lastElement);
        }
      }
      if (i < arr.length) {
        j = 0;
        for (; i < arr.length; ++i, ++j) {
          teams[j].push(arr[arr.length - 1 - i]);
        }
      }


      teams.forEach((team, index) => {
        team.forEach((camper) => {
          this.teams[index].push(camper);
        });
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: normal;
}

.blue {
  color: #3366ff;
}
</style>
