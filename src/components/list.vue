<template>
  <div class="list ">
      <div class="listItem" :id="'listitem-' + photo.popupsImage" v-for="(photo,index) in this.photoInfo.photos" >
          <img class="listImage" :class="{ 'selectedListImage': isSelected(photo)}"
                :src="photo.thumbnail"
                v-on:click="selectImage(photo)" />
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
      errorList: state => state.errorList,
      selectedItem: state => state.selectedItem
    })
  },

  watch: {
    selectedItem () {
      if (this.selectedItem) {
        var ele = document.getElementById('listitem-' + this.selectedItem.popupsImage)
        if (ele) {
          ele.scrollIntoView()
        }
      }
    }
  },

  methods: {
    isSelected: function (photo) {
      return photo === this.selectedItem
    },
    selectImage: function (photo) {
      this.doIt = !this.doIt
      if (this.selectedItem === photo) {
        this.$store.commit('selectItem', {item: null, zoomTo: false})
      } else {
        this.$store.commit('selectItem', {item: photo, zoomTo: true})
      }
    }
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

.selectedListImage {
  border: 4px solid #0099ff;
  margin-left: 1px;
  margin-right: 1px;
  margin-top: 0px;
  margin-bottom: -5px;
}

</style>
