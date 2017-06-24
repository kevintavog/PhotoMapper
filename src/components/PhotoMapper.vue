<template>
  <div class="photoMapper">
      <list></list>
      <geoMap></geoMap>
  </div>
</template>


<script>
import list from './list'
import geoMap from './geoMap'

export default {
  name: 'photomapper',
  components: { list, geoMap },
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
