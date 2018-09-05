<template>
  <div class="board">
    {{boardId}}
    <lists />
  </div>
</template>

<script>
import List from '@/components/List.vue'
export default {
  name: "board",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  props: ["boardId"]
};
</script>