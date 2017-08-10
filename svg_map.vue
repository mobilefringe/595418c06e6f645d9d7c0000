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
        }, :,
                width:1300,
        height: {
          type: ,
          default: 1000
        },
        suggestionAttribute:{
          type: String,
          required: true
        },
        eventName: {
          type: String,
          default: 'fuseResultsUpdated'
        },
        defaultAll: {
          type: Boolean,
          default: false
        },
        list: {
          type: Array
        },
        caseSensitive: {
          type: Boolean,
          default: false
        },
        includeScore: {
          type: Boolean,
          default: false
        },
        includeMatches: {
          type: Boolean,
          default: false
        },
        tokenize: {
          type: Boolean,
          default: false
        },
        matchAllTokens: {
          type: Boolean,
          default: false
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
                // viewBox: [3000,0,6000,6000],
                // disableAll: true,
                height:1000,
                width:1300,
                // regions:regions,
                tooltipsMode:'custom',
                loadingText: "loading...",
                zoom: true,
                zoomButtons: {'show': true,'location': 'left' },
                pan:true,
                cursor:'pointer',
                responsive:true,
                zoomLimit: [0,10]
            });
      }
    });
  });
</script>