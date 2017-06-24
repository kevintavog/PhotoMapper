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

        markers.push(Leaflet.marker([p.latitude, p.longitude], { icon: thumbnailIcon, photo: p }))
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
        var count = childMarkers.length
        var firstPhoto = childMarkers[0].options.photo
        var html = '<div class="clusterContainer"> <img class="clusterImage" src="' + firstPhoto.thumbnail + '" width="100%" height="100%"> <span class="c-badge c-badge--rounded clusterText">' + count + '</span>  </div>'

        return Leaflet.divIcon({
          iconSize: [firstPhoto.width / 2, firstPhoto.height / 2],
          html: html
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

/*.leaflet-marker-photo {
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px #888;
}

.leaflet-marker-photo div {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.leaflet-marker-photo b {
  position: absolute;
  top: -7px;
  right: -11px;
  color: #555;
  background-color: #fff;
  border-radius: 8px;
  height: 12px;
  min-width: 12px;
  line-height: 12px;
  text-align: center;
  padding: 3px;
  box-shadow: 0 3px 14px rgba(0,0,0,0.4);
}*/

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
