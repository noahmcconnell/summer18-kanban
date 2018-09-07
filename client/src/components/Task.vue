<template>
    <div class="task">
        <h5>{{taskData.name}} <button class="btn btn-danger btn-sm btn-circle" @click="deleteTask()"><i class="fa fa-times"></i></button></h5>
        <form @submit.prevent="addComment">
          <input type="text" placeholder="Comment" v-model="newComment.comment" required>
          <button type="submit">Add Comment</button>
        </form>
      <div v-for="comment in comments" :key="comment._id">
        <comment :commentData='comment'/>
      </div>
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

<style scoped>
.btn-circle {
  width: 20px;
  height: 20px;
  padding: 0px 0px 15px 0px;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  line-height: 0;
}
</style>