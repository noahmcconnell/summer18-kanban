<template>
  <div class="task card text-white bg-secondary mb-3 container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-5 offset-2">
      <h5><button class="btn btn-danger btn-sm btn-circle" style="margin-bottom: 3px;" @click="deleteTask()"><i class="fa fa-times"></i></button>{{taskData.name}}</h5>
      </div>
      <div class="col-sm-5">
      <select style="height: 30px;" v-model="newListId">
        <option disabled value="">Select List</option>
        <option v-for="list in lists" :value="list._id" :key="list._id">
          {{list.name}}
        </option>
      </select>
      <button @click="moveTask()" class="btn btn-success btn-sm move-btn-style" style="height: 30px">Move</button>
      </div>
    </div>
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
    font-size: 18px;
    line-height: 0;
  }

  ;
  .move-btn-style {
    width: 30px;
    height: 3px;
  }
</style>