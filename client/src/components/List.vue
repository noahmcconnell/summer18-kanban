<template>
  <div class="list">
    <h3>{{listData.name}} <button class="btn btn-danger btn-sm btn-circle" @click="deleteList()"><i class="fa fa-trash"></i></button></h3> 
    
    <p>{{listData.description}}</p>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="Task Name" v-model="newTask.name" required>
      <button type="submit">Add Task</button>
    </form>
    <div v-for="task in tasks" :key="task._id" >
      <task :taskData='task' />
    </div>
  </div>
</template>

<script>
import task from "@/components/Task.vue";

export default {
  name: "list",
  props: ["listData"],
  components: {
    task
  },
  created() {
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    } else {
      this.$store.dispatch("getTasks", this.listData._id);
    }
  },
  data() {
    return {
      newList: {
        name: "",
        description: ""
      },
      newTask: {
        name: "",
        listId: this.listData._id
      }
    };
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = { name: "", listId: this.listData._id };
    },

    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
    }
  }
};
</script>

<style scoped>
.btn-circle {
  width: 20px;
  height: 20px;
  padding: 0px 0px 15px 0px;
  border-radius: 0px;
  text-align: center;
  font-size: 18px;
  line-height: 0;
};

</style>