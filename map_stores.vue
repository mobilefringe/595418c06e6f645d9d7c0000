<template>
    <div class="maps">
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
        <div class="blue_dets_box" v-for="store in all_stores">
            <!--<div class="close_dets pull-left">-->
            <!--    <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">-->
            <!--</div>-->
            <div class="more_dets pull-right">
                <a :href="concatVal('/stores/',store.slug)"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></a>
            </div>
            <p class="dets_title">{{store.name}} </p>
            <p class="dets_data">{{store.property_id}}</p>
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
        mounted: function (){
            //init map on load and populate it with marker
             var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                var all_stores = _.groupBy(stores, 'name')[slug];
              //  var val = this.currentStore;
            $.each( all_stores , function( key, val ) {
                    regions = {};
                
                obj = {};
                if(val.store_front_url_abs.indexOf('missing.png') > -1){
                    obj["tooltip"] = "<div class='tooltip_div'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                }
                else{
                    obj["tooltip"] = "<div class='tooltip_div'><img src='" + val.store_front_url_abs + "'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                }
                obj["attr"] = {}
                regions[val.svgmap_region] = obj;
            });
            var map = $('#mapsvg').mapSvg({
                source: this.getSVGurl,    // Path to SVG map
                colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                // viewBox: [3000,0,6000,6000],
                // disableAll: true,
                height:1000,
                width:1300,
                regions:regions,
                tooltipsMode:'custom',
                loadingText: "loading...",
                zoom: true,
                zoomButtons: {'show': true,'location': 'left' },
                pan:true,
                cursor:'pointer',
                responsive:true,
                zoomLimit: [0,10]
            });
            // this.map = map;
            // console.log(this.map);
            this.getStoresByName(map);
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
                // var map = $('#mapsvg').mapSvg({
                //     source: this.getSVGurl,    // Path to SVG map
                //     colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                //     // viewBox: [3000,0,6000,6000],
                //     disableAll: true,
                //     height:1000,
                //     width:1300,
                //     tooltipsMode:'custom',
                //     loadingText: "loading...",
                //     zoom: true,
                //     zoomButtons: {'show': true,'location': 'left' },
                //     pan:true,
                //     cursor:'pointer',
                //     responsive:true,
                //     zoomLimit: [0,10]
                // });
                var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                this.all_stores = _.groupBy(stores, 'name')[slug];
                console.log( this.all_stores );
                $.each( this.all_stores , function( key, val ) {
                    if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        var coords = map.get_coords(val.svgmap_region);
                        var height = parseInt(coords["height"])
                        var width = parseInt(coords["width"])
                        var x_offset = (parseInt(width) / 2);
                        var y_offset = (parseInt(height) /2);
                        
                        map.setMarks([{ xy: [coords["x"]  , coords["y"] ],
                            attrs: {
                                src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png', // image for marker
                                href: '/stores/'+val.slug
                            },
                            tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
                        }]);
                        console.log(val.slug, val.svgmap_region);
                         map.selectRegion(val.svgmap_region);
                    }
                });
            },
            concatVal(val1,val2) {
                return val1 + val2;
            }
        }
    })
  })
</script>