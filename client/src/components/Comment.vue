<template>
    <div class="task">
        <p>{{comment.comment}}</p>
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
  mounted() {
    this.$store.dispatch("getComment");
  },
  data() {
    return {
      newComment: {
        name: "",

      }
    };
  },
  computed: {
    list() {
      return this.$store.state.comment;
    }
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentData);
    }
  }
};
</script>