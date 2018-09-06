<template>
    <div class="task">
        <p>{{taskData.name}}</p>
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
  data() {
    return {
      newTask: {
        name: ""
      }
    };
  },
  
  computed: {
    
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    }
  }
};
</script>