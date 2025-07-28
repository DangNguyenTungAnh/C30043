const app = Vue.createApp({});

app.component("app-read", {
  data() {
    return {
      units: []
    };
  },
  template: `
    <div>
      <h2 class="mb-4">Units Table</h2>
      <table class="table table-bordered table-striped">
        <thead class="table">
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Credit Points</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in units" :key="unit.code">
            <td>{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  mounted() {
    fetch("units.json")
      .then(response => response.json())
      .then(data => {
        this.units = data;
      })
      .catch((error) => {
        self.err = error;
      });
  }
});

app.mount("#app");
