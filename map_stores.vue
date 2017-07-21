<template>
    <div>
        <div class="map_page">
            <div class="map">
                <div @click="populateMap">Populate Map </div>
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
            this.getStoresByName();
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
            // ,
            // get_coords (v, map){
            //     v =  v.replace("stores", "");
            //     v = v.replace("doors", "");
            //     var v_data;
            //     var b=map.getData().R.bottom;
            //     while(b){
            //         if((typeof b.id) === "string"){
            //             var temp_id = b.id.replace(/[_-]/g, "");
            //             temp_id = temp_id.replace("stores", "");
            //             temp_id = temp_id.replace("doors", "");
            //             if(temp_id,(v.indexOf(temp_id) > -1)){
            //                 v_data= b;
            //             }
            //         }
            //         b=b.next
            //     }
            //     var coords = v_data.getBBox();
            //     return coords;
            // }
        },
         methods: {
            getStoresByName() {
               
                var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                // console.log(stores,slug);
                // this.dine_stores = _.orderBy(temp_dine_array, 'name');
                this.all_stores = _.groupBy(stores, 'name')[slug];
                
                
               
                var regions = {}
                $.each( this.all_stores , function( key, val ) {
                    if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        if(!val.store_front_url_abs ||  val.store_front_url_abs.indexOf('missing.png') > -1 || val.store_front_url_abs.length === 0){
                            val.store_front_url_abs = '//codecloud.cdn.speedyrails.net/sites/55ddf3f86e6f640775000000/a22fcf023d728855c6f575ba100806d7/default.jpg'
                        } 
                        obj = {};
                        obj["popover"] = "<p class='tooltip_name'>"+val.name+"</p> <a href='/stores/"+val.slug+"'>View Details</a>"
                        obj["attr"] = {}
                        // obj["attr"]["href"] = "/stores/"+val.slug
                        regions[val.svgmap_region] = obj;
                        
                    }
                });
                var map = $('#mapsvg').mapSvg({
                    source: this.getSVGurl,    // Path to SVG map
                    colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                    // viewBox: [3000,0,6000,6000],
                    // disableAll: true,
                    height:1000,
                    width:1300,
                    regions : regions,
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
                 //console.log(this.map);
                
                console.log(this.all_stores);
            },
            concatVal(val,key) {
                return val+""+key;
            },
            concatCood(val,key) {
                return val+","+key;
            },
            populateMap () {
                var map = this.map;
                console.log(map);
                $.each( this.all_stores , function( key, val ) {
                    if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        var coords = map.get_coords(val.svgmap_region);
                        //var coords = this.get_coords(val.svgmap_region,map);
                        var height = parseInt(coords["height"])
                        var width = parseInt(coords["width"])
                        var x_offset = (parseInt(width) / 2);
                        var y_offset = (parseInt(height) /2);
                        
                        map.setMarks([{ xy: [coords["x"]  + x_offset, coords["y"] + y_offset],
                            attrs: {
                                src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png',   // image for marker
                                href: '/stores/'+val.slug,
                                popover :"<p class='tooltip_name'>"+val.name+"</p>"
                            }
                        }]);
                    }
                });
            }
        }
    })
  })
</script>