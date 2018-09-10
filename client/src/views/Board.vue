<template>
  <div class="board container-fluid color-gradient">
    <div class="row justify-content-end">
      <button @click="logout">Logout</button>
    </div>
    <h1 style="color: white; text-shadow: 3px 3px black;">Create a List</h1>
    <form style="margin-bottom: 20px;" @submit.prevent="addList">
      <input type="text" placeholder="List Name" v-model="newList.name" required>
      <input type="text" placeholder="Description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <h4 style="color: white; text-shadow: 2px 2px black; margin: 40px;">LISTS:</h4>
    <div class="row">
    <div class="col-sm-4" v-for="list in lists" :key="list._id" >
      <!-- list component here -->
      <list :listData='list' />
    </div>
    </div>
  </div>
</template>

<script>
import list from "@/components/List.vue";

export default {
  name: "board",
  props: ["boardId"],
  components: {
    list
  },
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    } else {
      this.$store.dispatch("getLists", this.boardId);
    }
  },
  data() {
    return {
      newList: {
        name: "",
        description: "",
        boardId: this.boardId
      }
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    addList() {
      this.newList.boardId = this.boardId;
      this.$store.dispatch("addList", this.newList);
      this.newList = { name: "", description: "" };
    },
    logout() {
      this.$store.dispatch("logout", this.login);
    }
  }
};
</script>

<style>
.color-gradient{
  background-image: linear-gradient(maroon, grey); 
  height: 100vh;
};

</style>
