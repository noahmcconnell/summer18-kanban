<template>
  <div class="login color-gradient container-fluid">
    <div class="row justify-content-center">
    <div class="card col-sm-3" style="width: 18rem;">
    <form class="card-body" v-if="loginForm" @submit.prevent="loginUser">
      <input class="top-form" type="email" v-model="creds.email" placeholder="email">
      <input type="password" v-model="creds.password" placeholder="password">
      <button style="margin-right: 9rem;" type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="register">
      <input type="text" v-model="newUser.name" placeholder="name">
      <input type="email" v-model="newUser.email" placeholder="email">
      <input type="password" v-model="newUser.password" placeholder="password">
      <button type="submit">Create Account</button>
    </form>
    <div @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.color-gradient{
  background-image: linear-gradient(maroon, grey); 
  height: 100vh;
};
.justify-content-center{
  display: flex;
  justify-content: center
};
.align-content-center{
  display: flex;
  align-content: center;
}
</style>
