<template>
  <div class="list">
    <h3>{{listData.name}}</h3>
    <p>{{listData.description}}</p>
    <button @click="deleteList()">DELETE LIST</button>
  </div>
</template>

<script>
export default {
  name: "list",
  props: ["listData"],
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newList: {
        name: "",
        description: ""
      }
    };
  },
  computed: {
    list() {
      return this.$store.state.lists;
    }
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
    }
  }
};
</script>

<style scoped>
</style>