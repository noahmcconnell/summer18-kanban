<template>
  <div class="boards color-gradient container-fluid">
    <div class="row justify-content-end">
      <button @click="logout">Logout</button>
    </div>
    <div class="row justify-content-center">
      <h2 style="color: white; text-shadow: 3px 3px black;">Create a Board</h2>
    </div>
    <form style="margin-top: 1rem;" @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div class="" style="margin-top: 2rem;" v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <button @click="deleteBoard(board._id)">DELETE BOARD</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch("logout", this.login);
      }
    }
  };
</script>

<style>
</style>