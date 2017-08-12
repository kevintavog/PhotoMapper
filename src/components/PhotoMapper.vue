<template>
  <div class="photoMapper" @dragover="allowDrop" >
      <modalView></modalView> 
      <filterControls></filterControls>
      <div class="main" :class="{'with-filters':this.showFilters}">
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
  width: 100vw;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.main {
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.with-filters {
   width: calc(100vw - 350px);
}

</style>
