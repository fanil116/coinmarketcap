<template>
  <div class="signUp">
    <h3 class="text-center">Registration</h3>
    <b-form inline class="d-flex flex-column align-items-start p-4">
      <label for="inline-form-input-name">Login</label>
      <b-form-input
        id="registration-name"
        class="mb-2 w-100"
        v-model="login"
      ></b-form-input>

      <label for="inline-form-input-username">Password</label>
      <b-form-input
        type="password"
        id="registration-password"
        aria-describedby="password-help-block"
        v-model="password"
      ></b-form-input>

      <label for="inline-form-input-username">Current Password</label>
      <b-form-input
        type="password"
        id="current-password"
        aria-describedby="password-help-block"
        v-model="currentPassword"
      ></b-form-input>
      <b-button
        variant="primary"
        class="mx-auto my-0 w-100 mt-4"
        @click="submit"
        >Sign Up</b-button
      >
      <p class="green text-center mt-2" v-show="success">
        Registration comlete
      </p>
      <p class="red text-center mt-2" v-show="notRegistration">
        User with this login already exists
      </p>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "SignUp",
  data: () => ({
    currentPassword: "",
    login: "",
    password: "",
    userInfo: [],
    userLoginInfo: [],
    userObj: { name: "", password: "", watchlist: [] },
    success: false,
    notRegistration: false,
  }),
  methods: {
    emit() {
      this.$emit("closeSignup");
      this.$emit("openLogin");
      this.success = false;
      this.login = "";
      this.password = "";
      this.currentPassword = "";
    },
    infoSuccess() {
      this.success = true;
      setTimeout(() => {
        this.emit();
      }, 2000);
    },
    submit() {
      if (this.password == this.currentPassword) {
        if (this.login.length !== 0 && this.password.length !== 0) {
          let userLoginInfo = JSON.parse(localStorage.getItem("Users"));
          if (!Array.isArray(userLoginInfo)) userLoginInfo = [];
          userLoginInfo.some((item) => item.name === this.login);
          if (userLoginInfo.some((item) => item.name === this.login)) {
            this.notRegistration = true;
          } else {
            this.userObj.name = this.login;
            this.userObj.password = this.password;
            userLoginInfo.push(this.userObj);
            this.notRegistration = false;
            this.infoSuccess();
          }
          // userLoginInfo.includes(this.login)
          // ? (userLoginInfo = userLoginInfo.filter(
          //     (el) => el !== this.login || el !== this.password
          //   ))
          // : (this.userObj.name = this.login),
          // (this.userObj.password = this.password),
          // userLoginInfo.push(this.userObj),
          // this.infoSuccess();

          localStorage.setItem("Users", JSON.stringify(userLoginInfo));
          this.userLoginInfo = userLoginInfo;
        }
      } else {
        alert("Пороли не совпадают");
      }
    },
  },
};
</script>
<style scoped>
.signUp {
  background: #fff;
  color: #000;
  position: absolute;
  top: 8%;
  left: -15%;
  z-index: 9999;
}
</style>
