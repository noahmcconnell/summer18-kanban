<template>
  <div class="board">
    {{boardId}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.name" required>
      <input type="text" placeholder="description" v-model="newList.description">
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
          title: "",
          description: ""
        }
      };
    },
  methods: {
    addList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch("addList", this.newList);
        this.newList = { name: "", description: "" };
      },
      deleteList(listId) {
        this.$store.dispatch("deleteList", listId);
      }
    }
};
</script>