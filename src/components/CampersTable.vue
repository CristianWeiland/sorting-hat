<template>
  <div>
    <h5 style="margin-bottom: 20px; text-align: center">Acampantes: {{ campers.length }}</h5>
    <h5 style="margin-bottom: 20px; text-align: center">Soma de Idades: {{ totalAge }}</h5>
    <h5 style="margin-bottom: 20px; text-align: center">Média de Idades: {{ averageAge }}</h5>
    <table class="table table-bordered table-hover custom-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Gênero</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="camper in campers">
          <td>{{ resumeName(camper.name) }}</td>
          <td>{{ camper.age }}</td>
          <td>{{ camper.gender === 'M' ? 'Pia' : 'Guria' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'campers-table',
  props: ['campers', 'team', 'resume'],
  computed: {
    totalAge() {
      const totalAge = this.campers.reduce((acc, camper) => acc + camper.age, 0);
      this.$emit('totalAgeUpdate', { totalAge, team: this.team });
      return totalAge;
    },
    averageAge() {
      const averageAge = (this.totalAge / this.campers.length).toFixed(2);
      this.$emit('averageAgeUpdate', { averageAge, team: this.team });
      return averageAge;
    },
  },
  methods: {
    resumeName(name) {
      if (!this.resume) return name;
      const parts = name.split(' ');
      let tmp = [parts[0]];
      const len = name.length > 22 ? parts.length : parts.length - 1;
      for (let i = 1; i < len; i += 1) {
        if (parts[i][0] === 'd' && parts[i].length <= 3) {
          tmp.push(parts[i]);
        } else {
          tmp.push(parts[i][0] + '.');
        }
      }
      if (len === parts.length - 1) {
        tmp.push(parts[len]);
      }
      return tmp.join(' ');
    }
  },
};
</script>

<style scoped>
.custom-table {
  background-color: #f9f9f9;
  border: 1px solid #aaa;
}

thead {
  background-color: #f3f3f3;
}

thead > tr > th {
  border: 1px solid #aaa;
}

td {
  border: 1px solid #c6c6c6;
}

tbody {
  color: #000;
  font-weight: 500;
}
</style>