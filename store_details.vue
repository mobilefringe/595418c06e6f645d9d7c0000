<template>
  <!--<div class="row" v-if="currentStore">-->
    <!--<div class="large-6 columns">-->
    <!--  <div>-->
    <!--    <h1>{{currentStore.name}}</h1>-->
    <!--    <p>{{currentStore.description}}</p>-->
    <!--    <a v-bind:href="currentStore.website">{{currentStore.website}}</a>-->
    <!--  </div>-->
    <!--</div>-->
    <div>
        <div class="demo_1 map3" style="" id="mapsvg">
        </div>
  </div>
</template>

<script>
  define(["Vue", "jquery", "mm_mapsvg","mousewheel","raphael"], function(Vue, $,mapsvg,mousewheel,raphael) {
    return Vue.component("store-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          title: "The Path!",
          description: "An example of integration of Mall Maverick with Vue.js",
          currentStore: null,
          map: {}
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentStore = vm.findStoreBySlug(to.params.id);
          this.currentStore = vm.currentStore;
          console.log(this.currentStore);
          if (vm.currentStore === null || vm.currentStore === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentStore = this.findStoreBySlug(to.params.id);
        if (this.currentStore === null || this.currentStore === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      mounted : function (){
          
      },
      watch: {
            currentStore : function () {
                var val = this.currentStore;
                regions = {};
            
            obj = {};
            if(val.store_front_url_abs.indexOf('missing.png') > -1){
                obj["tooltip"] = "<div class='tooltip_div'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
            }
            else{
                obj["tooltip"] = "<div class='tooltip_div'><img src='" + val.store_front_url_abs + "'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
            }
            obj["attr"] = {}
            regions[val.svgmap_region] = obj
            
                var map = $('#mapsvg').mapSvg({
                    source: this.getSVGurl,    // Path to SVG map
                    colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                    // viewBox: [3000,0,6000,6000],
                    disableAll: true,
                    height:200,
                    width:1300,
                    regions: regions,
                    tooltipsMode:'custom',
                    loadingText: "loading...",
                    zoom: true,
                    zoomButtons: {'show': true,'location': 'left' },
                    pan:true,
                    cursor:'pointer',
                    responsive:true,
                    zoomLimit: [0,10]
                });
                this.loadMap(map);
            }
        },
      computed: {
        property(){
            return this.$store.getters.getProperty;
        },
        findStoreBySlug () {
          return this.$store.getters.findStoreBySlug;
        },
        getSVGurl : function () {
            return "https://www.mallmaverick.com" + this.property.svgmap_url;//this.property.svgmap_url;
        }
      }, 
      methods : {
         loadMap(map) {
            
            console.log(map);
            var val = this.currentStore;
            var coords = map.get_coords(val.svgmap_region);
            var height = parseInt(coords["height"])
            var width = parseInt(coords["width"])
            var x_offset = (parseInt(width) / 2);
            var y_offset = (parseInt(height) /2);
            
                
            // map.setMarks([{ xy: [coords["x"]  + x_offset, coords["y"] + y_offset],
            map.setMarks([{ xy: [coords["x"]  - 15 + x_offset, coords["y"] -55 + y_offset],
                attrs: {
                    src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500565442000/map_pin.png',   // image for marker
                    href: '/stores/'+val.slug,
                    tooltip :val.name
                },
                tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
            }]);
            map.setViewBox(val.svgmap_region);
            map.selectRegion(val.svgmap_region);
         }
      }
    });
  });
</script>
