const { createApp } = Vue;

createApp({
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        street: "",
        suburb: "",
        postcode: "",
        mobile: ""
      },
      errors: {},
      showTerms: false
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!/^[A-Za-z]+$/.test(this.form.firstName)) {
        this.errors.firstName = "First name must contain letters only.";
      }

      if (!/^[A-Za-z]+$/.test(this.form.lastName)) {
        this.errors.lastName = "Last name must contain letters only.";
      }

      if (!this.form.username || this.form.username.length < 3) {
        this.errors.username = "Username must be at least 3 characters.";
      }

      if (!this.form.password.match(/^(?=.*[$%^&*]).{8,}$/)) {
        this.errors.password = "Password must be at least 8 characters and contain one special character ($, %, ^, &, *).";
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = "Password does not match.";
      }

      if (!/^[^@]+@[^@]+\.[^@]+$/.test(this.form.email)) {
        this.errors.email = "Invalid email format.";
      }

      if (this.form.postcode.length !== 4 || !/^\d{4}$/.test(this.form.postcode)) {
        this.errors.postcode = "Postcode must be exactly 4 digits.";
      }

      if (!/^04\d{8}$/.test(this.form.mobile)) {
        this.errors.mobile = "Mobile must be 10 digits and start with 04.";
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        document.querySelector("form").submit();
      }
    },

    toggleTerms() {
      this.showTerms = !this.showTerms;
    }
  }
}).mount("#app");
