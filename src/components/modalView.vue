<template>
  <div class="o-modal modalView modalTopMost">
    <div class="c-card">
      <header class="c-card__header">
        <button type="button" class="c-button c-button--close">×</button>
        <h2 class="c-heading">Modal heading</h2>
      </header>
      <div class="c-card__body">
        This is the modal body
      </div>
      <footer class="c-card__footer">
        <button type="button" class="c-button c-button--brand">Close</button>
      </footer>
    </div>
  </div></template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'modalView',

  computed: {
    ...mapState({
      selectedItem: state => state.selectedItem
    })
  },

  watch: {
    selectedItem () {
      if (this.selectedItem) {
        console.log('modalView - selectedItem')
      }
    }
  },

  methods: {
    isSelected: function (photo) {
      return photo === this.selectedItem
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
  background-color: black;
  z-index: 10000;
}


</style>
