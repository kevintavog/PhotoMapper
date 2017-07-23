<template>
  <div v-if="this.showFilters" class="filters">
      <div v-if="photoInfo.photos.length === filteredItems.length">
          No items filtered out
      </div>
      <div v-if="filteredItems.length !== 0 && photoInfo.photos.length !== filteredItems.length">
          {{filteredItems.length}} items available, {{photoInfo.photos.length - filteredItems.length}} items filtered out
      </div>
      <div v-if="filteredItems.length === 0 && photoInfo.photos.length !== filteredItems.length">
          All {{photoInfo.photos.length}} items filtered out
      </div>
      <button class="c-button c-button--success" v-on:click="closeFilters()">Close</button>
      <div style="overflow-y:scroll">
          <div class="" v-for="f in this.photoInfo.filters">
              <!-- <div class="c-card__item c-card__item--brand">{{f.name}} -->
              <div class="c-card__item--brand">{{f.name}}
              </div>
              <!-- <div class="c-card__item filterSection"> -->
              <div class="filterSection">
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
      showFilters: state => state.showFilters
    })
  },

  methods: {
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
  color: white;
  max-width: 350px;
  max-height: 50vh;
  overflow:hidden;
}

.filterSection {
  color: white;
  background-color: black;
}

</style>
