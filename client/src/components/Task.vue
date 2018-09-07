<template>
  <div class="task">
    <select v-model="newListId">
      <option disabled value="">Please select one</option>
      <option v-for="list in lists" :value="list._id" :key="list._id">
        {{list.name}}
      </option>
      </select> 
      <button @click="moveTask()" class="btn btn-success btn-sm move-btn-style">Move</button>
    
    <h5>Task: {{taskData.name}} <button class="btn btn-danger btn-sm btn-circle" @click="deleteTask()"><i class="fa fa-times"></i></button></h5>
    <form @submit.prevent="addComment">
      <input type="text" placeholder="Comment" v-model="newComment.comment" required>
      <button type="submit">Add Comment</button>
    </form>
    <div v-for="comment in comments" :key="comment._id">
      <comment :commentData='comment' />
    </div>
  </div>
</template>

<script>
  import comment from "@/components/Comment.vue";
  import list from "@/components/List.vue"

  export default {
    name: "task",
    props: ["taskData"],
    components: {
      comment,
      list
    },
    created() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      } else {
        this.$store.dispatch("getComments", this.taskData._id);
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
        },
        newListId: ""
      };
    },

    computed: {
      comments() {
        return this.$store.state.comments[this.taskData._id];
      },
      lists() {
      return this.$store.state.lists;
    }
    },
    methods: {
      addComment() {
        this.$store.dispatch("addComment", this.newComment);
        this.newComment = { comment: "", taskId: this.taskData._id };
      },
      deleteTask() {
        this.$store.dispatch("deleteTask", this.taskData);
      },
      moveTask() {
        this.taskData.oldListId = this.taskData.listId
        this.taskData.listId = this.newListId
        this.$store.dispatch("moveTask", this.taskData)
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
  };
  .move-btn-style{
    width: 30px;
    height: 3px;
  }
</style>