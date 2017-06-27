<template>
  <div v-show="hasSelection()" class="modalView">
    <div class="modalContent">
      <img v-if="hasSelection()" class="modalImage" :src="selectedItem.popupsImage" />
      <div v-if="hasSelection()" class="u-large"> {{selectedItem.dateTime.toDateString()}}, {{selectedItem.dateTime.toLocaleTimeString()}} </div>
      <button type="button" class="c-button c-button--brand" v-on:click="closeModal()">Close</button>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'modalView',

  computed: {
    ...mapState({
      selectedItem: state => state.selectedItem
    })
  },

  methods: {
    hasSelection: function () {
      return !!this.selectedItem
    },

    closeModal: function () {
      this.$store.commit('selectItem', {item: null, zoomTo: false})
    }
  },

  data () {
    return {
    }
  }
}
</script>


<style scoped>

.modalView {
  position: relative;
  z-index: 10000;
  max-width: 30%;
  max-height: 30%;
  left: 2px;
}

.modalContent {
  background: black;
  padding-left: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
}

.modalImage {
  max-width: 100%;
  max-height: 100%;
}

</style>
