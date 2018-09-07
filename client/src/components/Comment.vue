<template>
    <div class="task">
      <p>{{commentData.comment}}</p>
      <button @click="deleteComment()">DELETE comment</button>
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
  mounted() {
    this.$store.dispatch("getComment");
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentData);
    }
  }
};
</script>