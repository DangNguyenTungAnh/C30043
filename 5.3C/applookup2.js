var units = [
  { code: 'ICT10001', desc: 'Problem Solving with ICT', credit: 12.5, type: 'Core' },
  { code: 'COS10005', desc: 'Web Development', credit: 12.5, type: 'Core' },
  { code: 'INF10003', desc: 'Introduction to Business Information Systems', credit: 12.5, type: 'Core' },
  { code: 'INF10002', desc: 'Database Analysis and Design', credit: 12.5, type: 'Core' },
  { code: 'COS10009', desc: 'Introduction to Programming', credit: 12.5, type: 'Core' },
  { code: 'INF30029', desc: 'Information Technology Project Management', credit: 12.5, type: 'Core' },
  { code: 'ICT30005', desc: 'Professional Issues in Information Technology', credit: 12.5, type: 'Core' },
  { code: 'ICT30001', desc: 'Information Technology Project', credit: 12.5, type: 'Core' }
];

// creating a component for the units to pass in the router
const Unit = {
  data() {
    return {
      units
    };
  },
  //define the template for the route results
  template: `
    <div v-if="filteredUnits.length" class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">{{ filteredUnits[0].code }} - {{ filteredUnits[0].desc }}</h5>
        <p class="card-text">
          <strong>Credit Points:</strong> {{ filteredUnits[0].credit }}<br>
          <strong>Type:</strong> {{ filteredUnits[0].type }}
        </p>
      </div>
    </div>
  `,
  computed: {
    //filter function (returns the selected unit object)
    filteredUnits: function() {
      const id = this.$route.params.id.toUpperCase();
      return this.units.filter(unit => unit.code.toUpperCase() === id);
    }
  }
};

// Creating the VueRouter
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/unit/:id',
      component: Unit
    } //defining path and the component
  ]
});

// create new app instance
const app = Vue.createApp({});

// creating component for the lookup table
app.component('app-lookup2', {
  data: function() {
    return {
      units
    };
  },
  //defining template for the app
  template: `
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light">
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Credit Points</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in units" :key="unit.code">
            <td><router-link :to="'/unit/' + unit.code">{{ unit.code }}</router-link></td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.credit.toFixed(2) }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// use router, mount to app
app.use(router);
app.mount('#app');
