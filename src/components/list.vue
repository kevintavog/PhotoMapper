<template>
  <div class="list ">
      <div class="listItem" v-for="(photo,index) in this.photoInfo.photos" >
          <img class="listImage" :src="photo.thumbnail" />
      </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'list',

  computed: {
    ...mapState({
      photoInfo: state => state.photoInfo,
      errorList: state => state.errorList
    })
  },

  data () {
    return {
    }
  }
}
</script>


<style scoped>

.list {
  flex: 0 1 auto;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: #212F3D;
}

.listItem {
  display: inline;
}

.listImage {
  border: 2px solid #fff;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 2px;
  margin-bottom: -3px;
}

</style>
