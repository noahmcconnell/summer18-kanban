<template>
    <div class="task">
        <p>{{taskData.name}}</p>
        <button @click="deleteTask()">DELETE Task</button>

    </div>    
</template>

<script>

import comment from "@/components/Comment.vue";

export default {
  name: "task",
  props: ["taskData"],
  compnents: {
    comment
  },
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }else {
      this.$store.dispatch("getComments", this.taskData._id)
    }
  },
  data() {
    return {
      newTask: {
        name: ""
      },
      newComment: {
        comment: "",
        taskId: this.taskData._id
      }
    };
  },
  
  computed: {
    comments(){
      return this.$store.state.comments[this.taskData._id]
    }
  },
  methods: {
    addComment(){
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {comment: "", taskId: this.taskData._id}
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    }
  }
};
</script>