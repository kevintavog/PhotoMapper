import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photoList: [],
    errorList: []
  },

  mutations: {
    loadPhotosList (state, url) {
      axios.get(url)
        .then(response => {
          if (response.status === 200) {
            var list = response.data.photos
            list.forEach(p => {
              p.dateTime = new Date(p.timestamp)
            })
            state.photoList = list
          } else {
            state.errorList.push('Request failed: %d, %s', response.status, response.data)
          }
        })
        .catch(error => {
          console.log('error: %o', error)
          state.errorList.push(error)
        })
    },

    removeError (state, error) {
      var index = state.errorList.indexOf(error)
      if (index >= 0) {
        state.errorList.splice(index, 1)
      }
    }

  }
})
