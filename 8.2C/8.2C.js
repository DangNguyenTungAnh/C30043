const app = Vue.createApp({});

app.component("app-read", {
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      units: [],
      currentPage: 1,
      perPage: 5
    };
  },
  computed: {
    // Function to get items for current page
    getItems() {
      let current = this.currentPage * this.perPage;
      let start = current - this.perPage;
      return this.units.slice(start, current);
    },
    // Function to calculate total number of pages
    getPageCount() {
      return Math.ceil(this.units.length / this.perPage);
    },
    // Function to get starting index for display
    getStartIndex() {
      return (this.currentPage - 1) * this.perPage;
    },
    // Function to get ending index for display
    getEndIndex() {
      let end = this.currentPage * this.perPage;
      return end > this.units.length ? this.units.length : end;
    }
  },
  methods: {
    // Callback function for pagination click
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    }
  },
  template: `
    <div>
      <h2 class="mb-4">Units Table</h2>
      
      <!-- Table with accessibility features -->
      <table class="table table-bordered table-striped" id="units-table">
        <caption>List of units</caption>
        <thead class="table-dark">
          <tr>
            <th scope="col" id="code-header">Code</th>
            <th scope="col" id="desc-header">Description</th>
            <th scope="col" id="cp-header">Credit Points</th>
            <th scope="col" id="type-header">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in getItems" :key="unit.code">
            <td headers="code-header">{{ unit.code }}</td>
            <td headers="desc-header">{{ unit.desc }}</td>
            <td headers="cp-header">{{ unit.cp }}</td>
            <td headers="type-header">{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination Component -->
      <div class="d-flex justify-content-center mt-4">
        <paginate
          :page-count="getPageCount"
          :page-range="5"
          :margin-pages="1"
          :click-handler="clickCallback"
          :prev-text="'Previous'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :active-class="'currentPage'"
          v-model="currentPage">
        </paginate>
      </div>
  `,
  mounted() {
    fetch("units.json")
      .then(response => response.json())
      .then(data => {
        this.units = data;
      })
      
  }
});

app.mount("#app");