<template>
  <div class="outerList">
      <div v-if="this.showFilmStrip" class="list " >
          <div >
              <div class="c-alert c-alert--error" v-for="er in this.errorList">
                  <button class="c-button c-button--close" v-on:click="removeError(er)">×</button>
                  {{er}}
              </div>
          </div>
          <div class="listItem" :id="'listitem-' + item.popupsImage" v-for="(item,index) in this.filteredItems" >
              <img class="listImage" :class="{ 'selectedListImage': isSelected(item)}"
                    :src="item.thumbnail"
                    v-on:click="selectImage(item)" />
          </div>
      </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'list',

  computed: {
    ...mapState({
      filteredItems: state => state.filteredItems,
      errorList: state => state.errorList,
      selectedItem: state => state.selectedItem,
      showFilmStrip: state => state.showFilmStrip
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
    previous: function () {
      console.log('prev')
    },

    next: function () {
      console.log('next')
    },

    removeError: function (er) {
      this.$store.commit('removeError', er)
    },

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

.outerList {
  min-height: 109px;
}

.list {
  flex: 0 1 auto;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: #212F3D;
  -webkit-overflow-scrolling: touch; /* Much better, more natural scrolling on iOS */
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
