<template>
    <div class="comment">
      <div class="card">
      <p>{{commentData.comment}}<button @click="deleteComment()">DELETE</button></p>
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
          comment: "",
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