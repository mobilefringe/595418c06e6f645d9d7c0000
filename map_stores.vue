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
        mounted: function (){
            // var map = $('#mapsvg').mapSvg({
            //     source: this.getSVGurl,    // Path to SVG map
            //     colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
            //     // viewBox: [3000,0,6000,6000],
            //     // disableAll: true,
            //     height:1000,
            //     width:1300,
            //     // regions:regions,
            //     tooltipsMode:'custom',
            //     loadingText: "loading...",
            //     zoom: true,
            //     zoomButtons: {'show': true,'location': 'left' },
            //     pan:true,
            //     cursor:'pointer',
            //     responsive:true,
            //     zoomLimit: [0,10]
            // });
            
        },
        watch: { 
            map : function (){
                // console.log(this.map);
                // if(this.map !== null && this.map !== undefined) {
                    this.getStoresByName(this.map);
                // }
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
            }
        },
         methods: {
            getStoresByName(map) {
                // console.log(map);
                var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                this.all_stores = _.groupBy(stores, 'name')[slug];
                // console.log( this.all_stores );
                // console.log("last", map);
                $.each( this.all_stores , function( key, val ) {
                _.forEach(this.all_stores, function(value, key) {
                    if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        var coords = map.get_coords(val.svgmap_region);
                        var height = parseInt(coords["height"])
                        var width = parseInt(coords["width"])
                        var x_offset = (parseInt(width) / 2);
                        var y_offset = (parseInt(height) /2);
                        
                        map.setMarks([{ xy: [coords["x"]    + x_offset-15, coords["y"]  + y_offset-20],
                            attrs: {
                                src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png', // image for marker
                                href: '/stores/'+val.slug
                            },
                            tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
                        }]);
                    }
                });
                 
            },
            concatVal(val1,val2) {
                return val1 + val2;
            },
            updateSVGMap (map) {
                
                this.map = map;
                console.log("updating map in svg_map",this.map );
            }
        }
        
    })
  })
</script>