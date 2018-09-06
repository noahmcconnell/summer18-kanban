<template>
  <div class="list">
    <h3>{{listData.name}}</h3> 
    <button @click="deleteList()">X</button>
    <p>{{listData.description}}</p>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="Task Name" v-model="newTask.name" required>
      <button type="submit">Add Task</button>
    </form>
    <div v-for="task in tasks" :key="task._id" >
      <task :taskData='task' />
    </div>
  </div>
</template>

<script>
import task from "@/components/Task.vue";

export default {
  name: "list",
  props: ["listData"],
  components: {
    task
  },
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }else {
      this.$store.dispatch("getTasks", this.listData._id);
    }
  },
  data() {
    return {
      newList: {
        name: "",
        description: ""
      },
      newTask: {
        name: "",
        listId: this.listData._id
      }
    };
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = { name: "" };
    },

    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
    }
  }
};
</script>

<style scoped>
</style>