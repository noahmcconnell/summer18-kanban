<template>
    <div class="comment container-fluid">
      <div class="row">
      <button class="btn btn-danger btn-sm btn-circle" style="margin-top: 15px;" @click="deleteComment()"><i class="fa fa-times"></i></button>
      <div class="card" style="width: 90%; margin: 5px">
      <p style="color: black">{{commentData.comment}}</p>
      </div>
      </div>
    </div>    
</template>

<script>
export default {
  name: "comment",
  props: ["commentData"],
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  data() {
    return {
      newComment: {
        comment: ""
      }
    };
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentData);
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
  };
</style>