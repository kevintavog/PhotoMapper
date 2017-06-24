<template>
  <div class="list ">
      <div class="listItem" v-for="(photo,index) in this.photoList" >
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
      photoList: state => state.photoList,
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
  margin-left: 6px;
  margin-top: 6px;
  margin-bottom: 0px;
}

</style>
