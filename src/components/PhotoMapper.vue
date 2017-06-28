<template>
  <div class="photoMapper">
      <modalView></modalView>
      <list></list>
      <geoMap></geoMap>
  </div>
</template>


<script>
import geoMap from './geoMap'
import list from './list'
import modalView from './modalView'

export default {
  name: 'photomapper',
  components: { geoMap, list, modalView },
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
}

</style>
