<template>
  <div class="photoMapper">
      <list></list>
      <geoMap></geoMap>
  </div>
</template>


<script>
import geoMap from './geoMap'
import list from './list'

export default {
  name: 'photomapper',
  components: { geoMap, list },
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
