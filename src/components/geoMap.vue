<template>
  <div class="geoMap" id="theMap" >
  </div>
</template>


// ---------------
<script>
import { mapState } from 'vuex'
import Leaflet from 'leaflet'
import 'leaflet.markercluster'

export default {
  name: 'geoMap',

  data () {
    return {
      map: null,
      cluster: null,
      locallySelectedPhoto: null
    }
  },

  methods: {
    getDefaultThumbnailIcon: function (photo) {
      return Leaflet.divIcon({
        iconSize: [photo.thumbWidth / 2, photo.thumbHeight / 2],
        html: '<img class="markerImage" src="' + photo.thumbnail + '" width="100%" height="100%" />'
      })
    },

    getSelectedThumbnailIcon: function (photo) {
      return Leaflet.divIcon({
        iconSize: [photo.thumbWidth / 1.4, photo.thumbHeight / 1.4],
        html: '<img class="selectedMarkerImage" src="' + photo.thumbnail + '" width="100%" height="100%" />'
      })
    }
  },

  computed: {
    ...mapState({
      photoInfo: state => state.photoInfo,
      errorList: state => state.errorList,
      selectedItem: state => state.selectedItem,
      zoomToSelected: state => state.zoomToSelected
    })
  },

  watch: {
    selectedItem () {
      if (this.locallySelectedPhoto) {
        this.locallySelectedPhoto.marker.setIcon(this.getDefaultThumbnailIcon(this.locallySelectedPhoto))
      }

      if (this.selectedItem) {
        this.locallySelectedPhoto = this.selectedItem
        this.locallySelectedPhoto.marker.setIcon(this.getSelectedThumbnailIcon(this.locallySelectedPhoto))

        // this.map.panTo([this.locallySelectedPhoto.latitude, this.locallySelectedPhoto.longitude])
        if (this.zoomToSelected) {
          this.map.fitBounds([
            [this.locallySelectedPhoto.latitude, this.locallySelectedPhoto.longitude],
            [this.locallySelectedPhoto.latitude, this.locallySelectedPhoto.longitude]])
        }
      } else {
        this.locallySelectedPhoto = null
      }
    },

    photoInfo () {
      var geoEpsilon = 0.002     // The bounds are tight, give a bit more space so everything is visible
      var bounds = this.photoInfo.bounds
      this.map.fitBounds([
          [bounds.minLatitude - geoEpsilon, bounds.minLongitude - geoEpsilon],
          [bounds.maxLatitude + geoEpsilon, bounds.maxLongitude + geoEpsilon]])

      var markers = []
      for (var p of this.photoInfo.photos) {
        var mark = Leaflet.marker([p.latitude, p.longitude], { icon: this.getDefaultThumbnailIcon(p), photo: p })

        mark.bindPopup(
          '<div class="c-text u-xlarge" > ' +
            '<img id="marker-' + p.popupsImage + '" src="' + p.popupsImage + '" /> ' +
            '<div> ' + p.dateTime.toDateString() + ', ' + p.dateTime.toLocaleTimeString() + ' </div>' +
          '</div>',
          { maxWidth: 'auto', photo: p })
        p.marker = mark

        // In order for the visible popup container to both be (a) bigger than the image and (b) centered over the
        // marker, update the popup (recalculate size & position) when the image finishes loading.
        this.map.on('popupopen', evt => {
          this.$store.commit('selectItem', {item: evt.popup.options.photo, zoomTo: false})
          var imgEle = document.getElementById('marker-' + evt.popup.options.photo.popupsImage + '')
          imgEle.onload = () => {
            evt.popup.update()
          }
        })
        markers.push(mark)
      }

      this.cluster.addLayers(markers)
      this.cluster.addTo(this.map)
    }
  },

  mounted: function () {
    var newMap = Leaflet.map('theMap', {
      center: [47.62060841124417, -122.3492968082428],
      zoom: 15,
      minZoom: 3,
      zoomControl: false
    })

    Leaflet.control.zoom({ position: 'topright' }).addTo(newMap)

    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(newMap)

    Leaflet.control.scale({ position: 'bottomright' }).addTo(newMap)

    var newCluster = Leaflet.markerClusterGroup({
      spiderfyDistanceMultiplier: 3,
      maxClusterRadius: 50,
      showCoverageOnHover: false,
      iconCreateFunction: clstr => {
        var childMarkers = clstr.getAllChildMarkers()
        var firstPhoto = childMarkers[0].options.photo

        return Leaflet.divIcon({
          iconSize: [firstPhoto.thumbWidth / 2, firstPhoto.thumbHeight / 2],
          html:
            '<div class="clusterContainer"> ' +
              '<img class="clusterImage" src="' + firstPhoto.thumbnail + '" width="100%" height="100%">' +
              '<span class="c-badge c-badge--rounded clusterText">' + childMarkers.length + '</span>' +
            '</div>'
        })
      }
    })

    this.map = newMap
    this.cluster = newCluster

    this.$store.commit('loadPhotos', 'static/photodata/photos.json')
  }

}
</script>


// ---------------
<style>

.clusterText {
  position: absolute;
  left: 4px;
  top: 4px;
  background-color: #090;
  color: white;
}

.clusterImage {
  border: 2px solid #ccc;
  box-shadow: 3px 3px 10px #444;
  position: relative;
}

.markerImage {
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px #888;
}

.selectedMarkerImage {
  border: 3px solid #0099ff;
  box-shadow: 3px 3px 10px #888;
}

</style>

<style scoped>

.geoMap {
  border: 1px #888 solid;
  border-left: none;
  border-right: none;
  margin: 0;
  flex: 1 1 auto;
}

</style>
