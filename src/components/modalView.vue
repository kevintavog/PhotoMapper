<template>
  <div v-show="hasSelection()" class="o-modal modalView" draggable="true" @dragstart="dragStart" @drag="drag" @drop="drop" @dragend="dragEnd"
    v-bind:style="{ transform: 'translate(' + translateX + 'px, ' + translateY + 'px)' }" >
    <div class="c-card">
      <div class="c-card__body modalContent">
        <img v-if="hasSelection()" class="modalImage" :src="selectedItem.popupsImage" :width="selectedItem.popupWidth*.68" :height="selectedItem.popupHeight*.68" />
        <div v-if="hasSelection()" class="u-medium"> {{selectedItem.dateTime.toDateString()}}, {{selectedItem.dateTime.toLocaleTimeString()}} </div>
        <div v-if="hasCity()" class="u-medium"> {{selectedItem.city}}, {{selectedItem.country}} </div>
        <footer class="c-card__footer">
            <a v-if="hasSelection()" :href="selectedItem.originalImage" target="_blank">Original</a>
            <a v-if="hasSelection()" :href="getStreetViewUrl()" target="_blank">Street view</a>
            <a v-if="hasSelection()" :href="getAlternateStreetViewUrl()" target="_blank">(Alternate)</a>
            <button type="button" class="c-button c-button--info u-small on-the-right" v-on:click="closeModal()">Close</button>
        </footer>
      </div>
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
    dragStart: function (evt) {
      this.startTranslateX = this.translateX
      this.startTranslateY = this.translateY
      this.dragStartX = evt.screenX
      this.dragStartY = evt.screenY
    },

    drag: function (evt) {
      this.translateX = evt.screenX - this.dragStartX + this.startTranslateX
      this.translateY = evt.screenY - this.dragStartY + this.startTranslateY
    },

    dragEnd: function (evt) {
      if (this.translateX < 0 && this.translateY < 0) {
        this.translateX = this.startTranslateX
        this.translateY = this.startTranslateY
      }
    },

    drop: function (evt) {
      this.dragStartX = -1
      this.dragStartY = -1
    },

    hasCity: function () {
      return !!this.selectedItem && !!this.selectedItem.city
    },

    hasSelection: function () {
      return !!this.selectedItem
    },

    closeModal: function () {
      this.$store.commit('selectItem', {item: null, zoomTo: false})
    },

    getStreetViewUrl: function () {
      return `http://maps.google.com/maps?q=&layer=c&cbll=${this.selectedItem.latitude},${this.selectedItem.longitude}&cbp=11,0,0,0,0`
    },

    getAlternateStreetViewUrl: function () {
      return `https://www.instantstreetview.com/@${this.selectedItem.latitude},${this.selectedItem.longitude},80.64h,5p,1z`
    }
  },

  data () {
    return {
      startTranslateX: 0,
      startTranslateY: 0,
      dragStartX: -1,
      dragStartY: -1,
      translateX: 0,
      translateY: 0
    }
  }
}
</script>


<style scoped>

.modalView {
  background-color: white;
  color: black;
  z-index: 10000;
  transform: none;
  width:auto;
  top: 15px;
  left: 15px;

  transform: translate(0px, 0px);
}

.on-the-right {
  float: right;
}
</style>
