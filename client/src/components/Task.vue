<template>
    <div class="task">
        <p>{{task.name}}</p>
        <button @click="deleteTask()">DELETE Task</button>
    </div>    
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.$store.dispatch("getLists");
  },
  data() {
    return {
      newTask: {
        name: "",

      }
    };
  },
  computed: {
    list() {
      return this.$store.state.tasks;
    }
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    }
  }
};
</script>