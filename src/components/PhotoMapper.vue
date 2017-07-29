<template>
  <div class="photoMapper">
      <!-- <modalView></modalView> -->
      <filterControls></filterControls>
      <div class="main">
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

export default {
  name: 'photomapper',
  components: { geoMap, list, filterControls, modalView },
  data () {
    return {
    }
  }
}
</script>


<style scoped>

.photoMapper {
  height: 100%;
  margin: 0;
  display: flex;
  flex-flow: column;
  overflow: hidden;
}

.main {
  height: 100%;
}

/*header {
  z-index: 0;
  display: flex;
}

app {
    flex: 1;
    display: flex;
    overflow: auto;
}

nav {
    flex: 0 0;
    order: 0;
}

article {
    flex: 1;
    order: 1;
    overflow: hidden;
}*/


</style>
