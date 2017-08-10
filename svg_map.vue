<template>
    <div class="svg-map" >
        <div class="map">
            <div class="demo_1 map3" style="" id="mapsvg"></div>
        </div>
    </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component('svg-map', {
      template: template,
      props: {
        svgMapUrl: {
          type: String,
          required: true
        },
        colours:{
          type: Object,
          default: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"}
        },
        viewBox : {
            type : Array,
            default: []
        }
        height: {
          type: Number,
          default: 1000
        },
        width:{
          type: Number,
          default: 1300
        },
        regions: {
          type: Array
        },
        loadingText: {
          type: String,
          default: "loading..."
        },
        zoom: {
          type: Boolean,
          default: true
        },
        zoomButtons: {
          type: Object,
          default: {'show': true,'location': 'left' }
        },
        pan: {
          type: Boolean,
          default: true
        },
        cursor: {
          type: String,
          default: 'pointer'
        },
        responsive: {
          type: Boolean,
          default: true
        },
        zoomLimit: {
          type: Array,
          default: [0,10]
        }
      },
      data() {
        return {
          isOpen: false,
          result: []
        }
      },
      mounted () {
        var map = $('#mapsvg').mapSvg({
                source: this.svgMapUrl,//this.getSVGurl,    // Path to SVG map
                colors: this.colours,
                viewBox: [3000,0,6000,6000],
                // disableAll: true,
                height:this.height,
                width:this.width,
                regions:this.regions,
                tooltipsMode:'custom',
                loadingText: this.loadingText,
                zoom: this,
                zoomButtons: this.zoomButtons,
                pan:this.pan,
                cursor:this.cursor,
                responsive:this.responsive,
                zoomLimit:this.zoomLimit
            });
      }
    });
  });
</script>