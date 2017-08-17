<template>
    <div class="maps">
        <div class="map_page">
            <!--<div class="map">-->
            <!--    <div class="demo_1 map3" style="" id="mapsvg"></div>-->
            <!--</div>-->
            <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl"></svg-map>
        </div>
        <div class="blue_dets_box" v-for="store in all_stores">
            <div class="more_dets pull-right">
                <a :href="concatVal('/stores/',store.slug)"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></a>
            </div>
            <p class="dets_title">{{store.name}} </p>
            <p class="dets_data">{{store.property_id}}</p>
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery", "Raphael", "mm_mapsvg","mousewheel","vue!svg-map"], function(Vue, $,Raphael,mapsvg,mousewheel,SVGMapComponent) {
    return Vue.component("map-store-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                all_stores: {},
                map :null
            }
        },
        created (){
          window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
        },
        watch: { 
            map : function (){
                this.getStoresByName();
            }
        },
        
        computed: {
            property : function(){
                return this.$store.getters.getProperty;
            },
            getSVGurl : function() {
                return "https://www.mallmaverick.com" + this.property.svgmap_url;//this.property.svgmap_url;
            },
            storesByAlphaIndex : function() {
                return this.$store.getters.storesByAlphaIndex;
            },
            storesByCategoryName : function() {
                return this.$store.getters.storesByCategoryName;
            },
            findStoreBySlug : function(){
                return this.$store.getters.findStoreBySlug;
            },
            svgMapRef: function(){
                return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
            }
        },
         methods: {
            getStoresByName() {
                // console.log("hello world");
                var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                this.all_stores = _.groupBy(stores, 'name')[slug];
                var temp = this.all_stores ;
                // console.log( this.all_stores );
                var temp_ref = this.svgMapRef;
                // console.log("last", map);
                _.delay(function() {
                    // console.log("hello world 2",temp);
                    _.forEach(temp, function(val, key) {
                        // console.log("hello");
                        temp_ref.addMarker(val,'//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png');
                       
                    });
                }, 6000);
                
                
            },
            concatVal(val1,val2) {
                return val1 + val2;
            },
            updateSVGMap (map) {
                this.map = map;
            }
        }
        
    })
  })
</script>