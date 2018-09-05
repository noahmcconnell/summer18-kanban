<template>
  <div class="board">
    {{boardId}}
    <list :lists='lists' />
  </div>
</template>

<script>

import list from '@/components/List.vue';

export default {
  name: "board",
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  props: ["boardId"],
  components:{
    list
  },
  computed: {
    lists(){
      return this.$store.state.lists;
    }
  }
};
</script>