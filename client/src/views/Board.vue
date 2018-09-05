<template>
  <div class="board">
    {{boardId}}
    <lists v-for="list in lists" />
  </div>
</template>

<script>
import lists from '@/components/List.vue'
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