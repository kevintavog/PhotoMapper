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
      cluster: null
    }
  },

  computed: {
    ...mapState({
      photoList: state => state.photoList,
      errorList: state => state.errorList
    })
  },

  watch: {
    photoList () {
      // Add bounds to json file and zoom to the bounds
      var markers = []
      for (var p of this.photoList) {
        var thumbnailIcon = Leaflet.divIcon({
          iconSize: [p.width / 2, p.height / 2],
          html: '<img class="markerImage" src="' + p.thumbnail + '" width="100%" height="100%" />'
        })

        var mark = Leaflet.marker([p.latitude, p.longitude], { icon: thumbnailIcon, photo: p })

        mark.bindPopup('<img id="' + p.popupsImage + '" src="' + p.popupsImage + '" />', { maxWidth: 'auto', photo: p })

        // In order for the visible popup container to both be (a) bigger than the image and (b) centered over the
        // marker, update the popup (recalculate size & position) when the popup is opened as well as when the image
        // finishes loading.
        this.map.on('popupopen', evt => {
          var imgEle = document.getElementById('' + evt.popup.options.photo.popupsImage + '')
          imgEle.onload = () => {
            evt.popup.update()
          }
          evt.popup.update()
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
      maxClusterRadius: 30,
      spiderfyDistanceMultiplier: 3,
      iconCreateFunction: clstr => {
        var childMarkers = clstr.getAllChildMarkers()
        var firstPhoto = childMarkers[0].options.photo

        return Leaflet.divIcon({
          iconSize: [firstPhoto.width / 2, firstPhoto.height / 2],
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

    this.$store.commit('loadPhotosList', 'static/photos.json')
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
