<template>
    <div>
        <div class="map_page">
            <div class="map">
            
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
  define(["Vue", "jquery", "mapsvg","mousewheel","raphael"], function(Vue, $,mapsvg,mousewheel,raphael) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                all_stores: {}
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
                return "https://www.mallmaverick.com" + this.property.map_url;//this.property.svgmap_url;
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
                        obj["popover"] = "<img src='"+val.store_front_url_abs+"'/><p class='tooltip_name'>"+val.name+"</p> <a href='/stores/"+val.slug+"'>View Details</a>"
                        obj["attr"] = {}
                        // obj["attr"]["href"] = "/stores/"+val.slug
                        regions[val.svgmap_region] = obj;
                        
                       // var coords = map.get_coords(val.svgmap_region);
                       // var height = parseInt(coords["height"])
                       // var width = //parseInt(coords["width"])
                        // var x = val.x_coordinate - 19;
                        // var y = val.y_coordinate - 58;
                        //var x_offset =// (parseInt(width) / 2);
                        //var y_offset = (parseInt(height) /2);
                        // console.log(map);
                        // map.setMarks([{ xy: [x , y ],
                        //     attrs: {
                        //             src:  '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500565442000/map_pin.png'     // image for marker
                        //         }
                        //     }
                        // ]);
                    }
                });
                var map = $('#mapsvg').mapSvg({
                    source: this.getSVGurl,    // Path to SVG map
                    colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                    // viewBox: [3000,0,6000,6000],
                    disableAll: true,
                    height:800,
                    width:1193,
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
                 console.log(map);
                $.each( this.all_stores , function( key, val ) {
                    if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        
                        var x = val.x_coordinate - 19;
                        var y = val.y_coordinate - 58;
                        //var x_offset =// (parseInt(width) / 2);
                        //var y_offset = (parseInt(height) /2);
                        // console.log(map);
                        map.setMarks([{ xy: [x , y ],
                            attrs: {
                                    src:  '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500565442000/map_pin.png'     // image for marker
                                }
                            }
                        ]);
                    }
                });
                 console.log(map);
                
                // $.each(this.all_stores, function(i, val){
                //     x = val.x_coordinate - 19;
                //     y = val.y_coordinate - 58;
                //     // val.coordinate = val.x_coordinate + "," +val.y_coordinate;
                //       $('#map_image').after('<div class="marker" id="store_' + val.id  + '" data-coords="' + x + ', ' + y + '"><a style="color:#fff" href=/stores/'+val.slug +'>' + val.name + '</a></div>');
                //   console.log(x,y);
                // });
                // $('.map').craftmap({
                //     container: {
                // 		name: 'map3' // (string) class name for an image container
                // 	},
                //     image:{
                //         width:500,
                //         height:400,
                //         name: 'map_image'
                //     },
                //     map: {
                //         position: 'center'
                //     },
                //     marker: {
                // 		name: 'marker', // (string) class name for a marker
                // 		center: true, // (bool) set true to pan the map to the center 
                // 		popup: true, // (bool) set true to show a popup
                // 		popup_name: 'popup', // (string) class name for popup
                // 		onClick: function(marker, popup){},
                // 		onClose: function(marker, popup){}
                // 	},
                // });
                // regions = {};
                // $.each( stores , function( key, val ) {
                //     if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                //         obj = {};
                //         if(val.store_front_url_abs.indexOf('missing.png') > -1){
                //             obj["tooltip"] = "<div class='tooltip_div'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                //         }
                //         else{
                //             obj["tooltip"] = "<div class='tooltip_div'><img src='" + val.store_front_url_abs + "'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                //         }
                //         obj["attr"] = {}
                //         regions[val.svgmap_region] = obj
                //     }
                // });
                // $('#store_select_container').change(function(e){
                //     drop_pin($(this).val())
                // })
                // init_map(regions, 2500, 2000)
                
                // $('.map_pin_a').click(function(e){
                //     e.preventDefault();
                //     var id = $(this).attr('data-value')
                //     map_pin(id)
                // })
                
                // function map_pin(value){
                //     map.marksHide();
                //     value = value.split('/')
                //     if (value[0] != null){
                //         drop_pin(value[0], map);    
                //     }
                // }
                console.log(this.all_stores);
            },
            concatVal(val,key) {
                return val+""+key;
            },
            concatCood(val,key) {
                return val+","+key;
            }
        }
    })
  })
</script>

<style>
    .marker {
        background: url("//kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/7760d28d65f477cd66bd4756f9204c15/map_pin2.png") no-repeat;
        background-size:contain;
        cursor: pointer;
        display: block;
        height: 35px;
        margin-top: 5px;
        outline: medium none;
        text-indent: -9999px;
        width: 25px;
    }
</style>