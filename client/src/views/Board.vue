<template>
  <div class="board">
    {{boardId}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="List Name" v-model="newList.name" required>
      <input type="text" placeholder="Description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in lists" :key="list._id" >
      <!-- list component here -->
      <list :lists='lists' />
    </div>
  </div>
</template>

<script>

import list from "@/components/List.vue";

export default {
  name: "board",
  components: {
    list
  },
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  props: ["boardId"],
  computed: {
    lists() {
      return this.$store.state.lists;
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
  methods: {
    addList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch("addList", this.newList);
        this.newList = { name: "", description: "" };
      },
    }
};
</script>