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
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: [],
    comments: []
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
    getLists({ commit, dispatch }) {
      api.get('lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, listData) {
      api.post('lists', listData)
        .then(res => {
          dispatch('getLists')
        })
    },
    deleteList({ commit, dispatch }, listId) {
      api.delete('lists/' + listId)
        .then(res => {
          dispatch('getLists')
        })
    },

    //Tasks
    getTasks({ commit, dispatch }) {
      api.get('tasks')
        .then(res => {
          commit('setTasks', res.data)
        })
    },
    addTask({ commit, dispatch }, taskData) {
      api.post('tasks', taskData)
        .then(serverTask => {
          dispatch('getTasks')
        })
    },
    deleteTask({ commit, dispatch }, taskId) {
      api.delete('tasks/' + taskId)
        .then(res => {
          dispatch('getTasks')
        })
    },
    //Comments
    getComments({ commit, dispatch }) {
      api.get('comments')
        .then(res => {
          commit('setComments', res.data)
        })
    },
    addComment({ commit, dispatch }, commentData) {
      api.post('comments', commentData)
        .then(serverComment => {
          dispatch('getComments')
        })
    },
    deleteComment({ commit, dispatch }, commentId) {
      api.delete('comments/' + commentId)
        .then(res => {
          dispatch('getComments')
        })
    },
  }
})