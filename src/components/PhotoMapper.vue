<template>
  <div class="photoMapper" :class="{'show-filter':this.showFilters, 'hide-filter':!this.showFilters}" @dragover="allowDrop" >
      <modalView></modalView>
      <filterControls></filterControls>
      <div class="main" :class="{'show-list':this.showFilmStrip, 'hide-list':!this.showFilmStrip}">
          <list></list>
          <geoMap></geoMap>
      </div>
  </div>
</template>


<script>
import filterControls from './filterControls'
import geoMap from './geoMap'
import list from './list'
import modalView from './modalView'
import { mapState } from 'vuex'

export default {
  name: 'photomapper',

  components: { geoMap, list, filterControls, modalView },

  data () {
    return {
    }
  },

  methods: {
    allowDrop: function (event) {
      event.preventDefault()
    }
  },

  computed: {
    ...mapState({
      showFilters: state => state.showFilters,
      showFilmStrip: state => state.showFilmStrip
    })
  }

}
</script>


<style scoped>

.photoMapper {
    display: grid;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.show-filter {
    grid-template-columns: max-content 1fr;
}

.hide-filter {
    grid-template-columns: 1fr;
}

.main {
    display: grid;
}

.show-list {
    grid-template-rows: max-content 1fr;
}

.hide-list {
    grid-template-rows: 1fr;
}
</style>
