import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photoInfo: { photos: [] },
    filteredItems: [],
    errorList: [],
    selectedItem: null,
    zoomToSelected: false,
    showFilmStrip: true,
    showFilters: false,
    bus: new Vue()
  },

  mutations: {
    loadPhotos (state, url) {
      axios.get(url)
        .then(response => {
          if (response.status === 200) {
            var list = response.data.photos
            list.forEach(p => {
              p.dateTime = new Date(p.timestamp)
            })
            response.data.filters.forEach(f => {
              f.selectedCount = 0
              f.expanded = true
            })
            state.photoInfo = response.data
            state.filteredItems = state.photoInfo.photos
          } else {
            state.errorList.push('Request failed: %d, %s', response.status, response.data)
          }
        })
        .catch(error => {
          if (error.request) {
            state.errorList.push(error.message + ' - ' + error.request.responseURL)
          } else {
            state.errorList.push(error.message + ' - ' + url)
          }
        })
    },

    removeError (state, error) {
      var index = state.errorList.indexOf(error)
      if (index >= 0) {
        state.errorList.splice(index, 1)
      }
    },

    toggleExpanded (state, filter) {
      filter.expanded = !filter.expanded
    },

    filterUpdated (state, params) {
      if (params.filterValue.selected) {
        params.filter.selectedCount += 1
      } else {
        params.filter.selectedCount -= 1
      }

      // For each filter (city, country, ...) - if no filter values are selected, the filter
      // isn't applied.
      // If some filter values are selected, all selected values are OR'd together
      // If both city & year are selected, it's an AND operation
      state.filteredItems = state.photoInfo.photos.filter(item => {
        var match = true
        state.photoInfo.filters.forEach(f => {
          // An earlier filter matched
          if (match) {
            if (f.selectedCount > 0) {
              // It's only a match if a selected value matches the item
              match = f.values.filter(fv => {
                return fv.selected && fv.value === item[f.field]
              }).length > 0
            }
          }
        })
        return match
      })
    },

    selectItem (state, params) {
      state.zoomToSelected = params.zoomTo
      if (!params.item) {
        state.selectedItem = null
        return
      }

      if (params.item !== state.selectedItem) {
        state.selectedItem = params.item
      }
    },

    setShowFilters (state, isVisible) {
      state.showFilters = isVisible
    },

    setFilmStripVisible (state, isVisible) {
      state.showFilmStrip = isVisible
    }

  }
})
