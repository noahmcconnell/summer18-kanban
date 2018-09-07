import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: {},
    tasks: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists){
      state.lists = lists
    },
    setTasks(state, data){
      Vue.set(state.tasks, data.listId, data.tasks)
    },
    setComments(state, data){
      Vue.set(state.comments, data.taskId, data.comments)
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({commit, dispatch}) {
      auth.delete('logout')
      .then(res => {
        commit('setUser', {})
        router.push({name: 'login'})
      })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },

    //Lists
    getLists({ commit, dispatch }, boardId) {
      api.get('lists/'+ boardId)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, listData) {
      api.post('lists', listData)
        .then(res => {
          dispatch('getLists', listData.boardId)
        })
    },
    deleteList({ commit, dispatch }, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
    },

    //Tasks
    getTasks({ commit, dispatch }, listId) {
      api.get('tasks/' + listId)
        .then(res => {
          commit('setTasks', {listId, tasks: res.data})
        })
    },
    addTask({ commit, dispatch }, taskData) {
      api.post('tasks', taskData)
        .then(res => {
          dispatch('getTasks', taskData.listId)
        })
    },
    deleteTask({ commit, dispatch }, task) {
      api.delete('tasks/' + task._id)
        .then(res => {
          dispatch('getTasks', task.listId)
        })
    },
    moveTask({commit, dispatch}, taskData) {
      api.put('tasks/' + taskData._id, taskData)
      .then(res => {
        dispatch('getTasks', taskData.listId)
        dispatch('getTasks', taskData.oldListId)
      })
    },
    //Comments
    getComments({ commit, dispatch }, taskId) {
      api.get('comments/' + taskId)
        .then(res => {
          commit('setComments', { taskId, comments: res.data})
        })
    },
    addComment({ commit, dispatch }, commentData) {
      api.post('comments', commentData)
        .then(res => {
          dispatch('getComments', commentData.taskId)
        })
    },
    deleteComment({ commit, dispatch }, comment) {
      api.delete('comments/' + comment._id)
        .then(res => {
          dispatch('getComments', comment.taskId)
        })
    },
  }
})