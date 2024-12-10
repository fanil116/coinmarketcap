<template>
  <div class=" logIn">
    <h3 class="text-center">Sign In</h3>
    <b-form inline class="d-flex flex-column align-items-start p-4">
      <label for="inline-form-input-name">Login</label>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 w-100"
        v-model="login"
      ></b-form-input>

      <label for="inline-form-input-username">Password</label>
      <b-form-input
        type="password"
        id="text-password"
        aria-describedby="password-help-block"
        v-model="password"
      ></b-form-input>
      <div v-show="loginError">Логин либо пороль не верны</div>
      <b-button
        variant="primary"
        class="mx-auto my-0 w-100 mt-4"
        @click="submit"
        >Sign In</b-button
      >
    </b-form>
  </div>
</template>
<script>
export default {
  name: "LogIn",
  data: () => ({
    login: "",
    password: "",
    userInfo: [],
    loginError: false,
  }),
  methods: {
    submit() {
      const users = JSON.parse(localStorage.getItem("Users"));

      const user = users.find(
        (el) =>
          el.name.toLowerCase() === this.login.toLowerCase() &&
          el.password.toLowerCase() === this.password.toLowerCase()
      );
      if (user == undefined) {
        this.loginError = true;
      }
      localStorage.setItem("User", JSON.stringify(user));

      if (user) this.$emit("addUser");
      this.$store.dispatch("ADD_USER", user);
    },
  },
};
</script>
<style scoped>
.logIn {
  position: absolute;
  top: 8%;
  left: -15%;
  z-index: 999999;
  border-radius: 48px;
  padding: 12px 24px;
  background: #fff;
  color: #000;
}
</style>
