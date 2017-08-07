<template>
  <div v-if="this.showFilters" class="filters">
      <span class="filterHeader">
          <div v-if="photoInfo.photos.length === filteredItems.length">
              No items filtered out
          </div>
          <div v-if="filteredItems.length !== 0 && photoInfo.photos.length !== filteredItems.length">
              {{filteredItems.length}} items available, {{photoInfo.photos.length - filteredItems.length}} items filtered out
          </div>
          <div v-if="filteredItems.length === 0 && photoInfo.photos.length !== filteredItems.length">
              All {{photoInfo.photos.length}} items filtered out
          </div>
          <button class="c-button c-button--success closeButton" v-on:click="closeFilters()">Close</button>
          <button class="c-button fitmapButton" v-on:click="fitMap()">Fit</button>
          <hr>
      </span>

      <div class="filterContents" >
          <div class="" v-for="f in this.photoInfo.filters">
              <div class="c-card__item--brand filterName" v-on:click="toggleExpanded(f)" >{{getToggleCharacter(f)}} {{f.name}} {{getSelectedItems(f)}}
              </div>
              <div class="filterSection" v-if="f.expanded" >
                  <label class="c-field c-field--choice" v-for="fv in f.values">
                    <input type="checkbox" v-model="fv.selected" v-on:click="filterUpdated(f, fv)"> {{fv.value}}
                  </label>
              </div>
          </div>
      </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'filterControls',

  computed: {
    ...mapState({
      photoInfo: state => state.photoInfo,
      filteredItems: state => state.filteredItems,
      showFilters: state => state.showFilters,
      bus: state => state.bus
    })
  },

  methods: {
    toggleExpanded: function (filter) {
      this.$store.commit('toggleExpanded', filter)
    },

    getToggleCharacter: function (filter) {
      if (filter.expanded) {
        return '▼'
      } else {
        return '▶'
      }
    },

    getSelectedItems: function (filter) {
      if (filter.selectedCount === 0) {
        return ''
      } else {
        return '(' + filter.selectedCount + ')'
      }
    },

    fitMap: function () {
      this.bus.$emit('fitMap', 1)
    },

    closeFilters: function () {
      this.$store.commit('setShowFilters', false)
    },

    filterUpdated: function (filter, filterValue) {
      this.$store.commit('filterUpdated', { filter, filterValue })
    }
  },

  data () {
    return {
    }
  }
}
</script>


<style scoped>

.filters {
    overflow-y: auto;

    color: white;
    margin-left: 3px;
    padding-left: 5px;
    background-color: black;
    width: 300px;
}

.filterHeader {
}

.closeButton {
  margin-left: 5px;
}

.fitmapButton{
  float: right;
  margin-right: 5px;
}

.filterContents {
}

.filterName {
  padding-left: 5px;
}
.filterSection {
  color: white;
}

</style>
