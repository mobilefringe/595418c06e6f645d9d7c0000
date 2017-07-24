<template>
    <div>
        <div class="map_page">
            <div class="map">
                <!--<div @click="populateMap">Populate Map </div>-->
                <div class="demo_1 map3" style="" id="mapsvg">       
                
                    <!--<img alt="map_image" id="map_image" class="map_image" :src="getSVGurl"> -->
                    
                    <!--<div v-for = "store in all_stores" class="marker" style="display: inline-block;" :id="concatVal('store_',store.id)" :data-coords="concatCood(store.x_coordinate, store.y_coordinate)">-->
                    <!--    <a  style="color:#fff" :href="concatVal('/stores/',store.slug)">  {{store.name}}  </a>-->
                    <!--</div>-->
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery", "mm_mapsvg","mousewheel","raphael"], function(Vue, $,mapsvg,mousewheel,raphael) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                all_stores: {},
                map :{}
            }
        },
        mounted: function () {
            //init map on load and populate it with marker
            var map = $('#mapsvg').mapSvg({
                source: this.getSVGurl,    // Path to SVG map
                colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                // viewBox: [3000,0,6000,6000],
                // disableAll: true,
                height:1000,
                width:1300,
                tooltipsMode:'custom',
                loadingText: "loading...",
                zoom: true,
                zoomButtons: {'show': true,'location': 'left' },
                pan:true,
                cursor:'pointer',
                responsive:true,
                zoomLimit: [0,10]
            });
            this.map = map;
            // console.log(this.map);
            this.getStoresByName(map);
        },
        watch: {
           
        },
        computed: {
            property(){
                return this.$store.getters.getProperty;
            },
            getSVGurl : function () {
                return "https://www.mallmaverick.com" + this.property.svgmap_url;//this.property.svgmap_url;
            },
            storesByAlphaIndex() {
                return this.$store.getters.storesByAlphaIndex;
            },
            storesByCategoryName() {
                return this.$store.getters.storesByCategoryName;
            },
            findStoreBySlug (){
                return this.$store.getters.findStoreBySlug;
            }
        },
         methods: {
            getStoresByName(map) {
                
                var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                this.all_stores = _.groupBy(stores, 'name')[slug];
                // console.log( this.all_stores );
                $.each( this.all_stores , function( key, val ) {
                    if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        // console.log("2x",map);
                        // console.log(val.svgmap_region,map);
                        // this.populateMap(val.svgmap_region,map);
                        
                    }
                });
                
            },
            concatVal(val,key) {
                return val+""+key;
            },
            concatCood(val,key) {
                return val+","+key;
            }
            // ,
            // populateMap (svg_val,map) {
            //     console.log("3x",map);
            //     var coords = map.get_coords(svg_val);
            //     var height = parseInt(coords["height"])
            //     var width = parseInt(coords["width"])
            //     var x_offset = (parseInt(width) / 2);
            //     var y_offset = (parseInt(height) /2);
                
            //     map.setMarks([{ xy: [coords["x"]  + x_offset, coords["y"] + y_offset],
            //         attrs: {
            //             src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png',   // image for marker
            //             href: '/stores/'+val.slug,
            //             tooltip :val.name
            //         },
            //         tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
            //     }]);
            // }
        }
    })
  })
</script>








<template>
  <div class="row" v-if="currentStore">
    <div class="large-6 columns">
      <div>
        <h1>{{currentStore.name}}</h1>
        <p>{{currentStore.description}}</p>
        <a v-bind:href="currentStore.website">{{currentStore.website}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  define(["Vue"], function(Vue) {
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
          if (vm.currentStore === null || vm.currentStore === undefined){
            vm.$router.replace({ name: '404'});
          }
            var coords = map.get_coords(val.svgmap_region);
            var height = parseInt(coords["height"])
            var width = parseInt(coords["width"])
            var x_offset = (parseInt(width) / 2);
            var y_offset = (parseInt(height) /2);
            
            this.map.setMarks([{ xy: [coords["x"]  + x_offset, coords["y"] + y_offset],
                attrs: {
                    src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png',   // image for marker
                    href: '/stores/'+val.slug,
                    tooltip :val.name
                },
                tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
            }]);
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentStore = this.findStoreBySlug(to.params.id);
        if (this.currentStore === null || this.currentStore === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      mounted : function () {
        this.loadMap();
      },
      computed: {
        findStoreBySlug () {
          return this.$store.getters.findStoreBySlug;
        }
      }, 
      methods : function () {
         loadMap() {
            this.map = $('#mapsvg').mapSvg({
                    source: this.getSVGurl,    // Path to SVG map
                    colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                    // viewBox: [3000,0,6000,6000],
                    disableAll: true,
                    height:1000,
                    width:1300,
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
      }
    });
  });
</script>
