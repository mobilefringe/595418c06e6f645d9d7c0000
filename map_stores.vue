<template>
    <div>
        <div class="map_page">
            <!--<div class="gray_bar">-->
            <!--    <div class="col-xs-10">-->
            <!--        <input v-model="mobile_search_store" v-on:keyup="showStore1Details" class= "mobile_map_search" placeholder="Search Stores" >-->
            <!--        <input v-model="mobile_find_store"  v-on:keyup="showStore2Details" class= "mobile_map_search" placeholder="Find a store near you" >-->
            <!--    </div>-->
            <!--    <img @click="swapSearchTerm" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1498848398000/Arrows Icon.png" class="search_icon" alt="">-->
                
            <!--</div>-->
            <!--<div id="search_results_items" class="search-results-items" style="">-->
            <!--RENDERED BY renderSearchResultsTemplate(..) -->
            <!--</div>-->
            <div class="map">
            
                <div class="demo_1 map3" style="" id="mapsvg">       
                
                    <img alt="map_image" id="map_image" v-bind:src="getSVGurl"> 
                    <!--v-bind:src={{getSVGurl}} src=-->
                    <!--<div v-show = "mobile_search_store" class="blue_dets_box" v-bind:class="{ lift_up: lift_blue_box }">-->
                    <!--    <div class="close_dets pull-left">-->
                    <!--        <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">-->
                    <!--    </div>-->
                    <!--    <div class="more_dets pull-right">-->
                    <!--        <router-link v-bind:to="store1.path_url"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></router-link>-->
                    <!--    </div>-->
                    <!--    <p class="dets_title">{{store1.name}} </p>-->
                    <!--    <p class="dets_data">Building Name {{store1.name}}</p>-->
                    <!--</div>-->
                    <!--<div  v-show = "mobile_find_store" class="green_dets_box">-->
                    <!--    <div class="close_dets pull-left">-->
                    <!--        <img @click="removeSearch2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">-->
                    <!--    </div>-->
                    <!--    <div class="more_dets pull-right">-->
                    <!--    <router-link v-bind:to="store2.path_url"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></router-link>-->
                            
                    <!--    </div>-->
                    <!--    <p class="dets_title">{{store2.name}}</p>-->
                    <!--    <p class="dets_data">Building Name {{store2.name}}</p>-->
                        
                    <!--</div>-->
                    <div v-for = "store in all_stores">
                        <!--<div class="marker" id="store_{{store.id}}" data-coords="{{store.x_coordinate}} , {{store.y_coordinate}}">-->
                        <!--    <a style="color:#fff" href=/stores/store.slug>  store.name  </a>-->
                        <!--</div>-->
                        <router-link tag="div" :to="{ name: 'storeDetails', params: { id: store.slug }}" :data-coords="store.x_coordinate ,store.y_coordinate"  class="marker">
                           <a style="color:#fff" >  {{store.name}}  </a>
                        </router-link>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery", "mapsvg","mousewheel","craftmap"], function(Vue, $,mapsvg,mousewheel,craftmap) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                title: "The Path!",
                description: "Using new SDK",
                mobile_search_store : "",
                mobile_find_store: "",
                lift_blue_box: false,
                all_stores: {},
                store1: {},
                store2: {}
            }
        },
        created: function () {
            this.getStoresByName();
        },
        watch: {
            // mobile_find_store : function (val) {
            //     if(val != '') {
            //         this.lift_blue_box = true
            //     }
            //   else {
            //         this.lift_blue_box = false;
            //   }
            // }
        },
        computed: {
            property(){
                return this.$store.getters.getProperty;
            },
            getSVGurl : function () {
                return "https://www.mallmaverick.com" + this.property.svgmap_url;
            },
            // showStore1Details: function() {
            //     this.store1 =  this.findStoreBySlug("tdcentre-starbucks-coffee--2");
            //     this.store1.path_url = "stores/" + this.store1.slug;
            // },
            // showStore2Details: function() {
            //     this.store2 = this.findStoreBySlug("eatoncentrepath-nino-d-arena");
            //      this.store2.path_url = "stores/" + this.store2.slug;
            // },
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
            // swapSearchTerm: function () {
            //     var temp_search1 = this.mobile_search_store;
            //     this.mobile_search_store = this.mobile_find_store;
            //     this.mobile_find_store = temp_search1;
            // },
            // removeSearch1 :function() {
            //     this.mobile_search_store = '';
            // },
            // removeSearch2 :function() {
            //     this.mobile_find_store = '';
            // }
            getStoresByName() {
               
                var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                console.log(stores,slug);
                // this.dine_stores = _.orderBy(temp_dine_array, 'name');
                this.all_stores = _.groupBy(stores, 'name')[slug];
                
                console.log(this.all_stores);
                $.each(this.all_stores, function(i, val){
                   x = val.x_coordinate - 19;
                   y = val.y_coordinate - 58;
                    
                //   $('#map_image').after('<div class="marker" id="store_' + val.id  + '" data-coords="' + x + ', ' + y + '"><a style="color:#fff" href=/stores/'+val.slug +'>' + val.name + '</a></div>');
                  console.log(x,y);
                });
                $('#mapsvg').craftmap({
                    image:{
                        width:1650,
                        height:1636
                    },
                    map: {
                        position: 'center'
                    }
                });
                
                // reg = {}
                // reg["path103"]={disabled: true};
                // reg["path193"]={disabled: true};
                // reg["path194"]={disabled: true};
                
                // $.each( this.all_stores , function( key, val ) {
                
                //     if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                //         console.log(val.svgmap_region);
                //         obj = {};
                //         obj["tooltip"] = "<label class='store_name_map'> "+val.name +"</label>"
                //         obj["attr"] = {}
                //         obj["attr"]["href"] = '/stores/'+val.slug 
                //         reg[val.svgmap_region] = obj
                //     }
                // });
            
                // $('#mapsvg').mapSvg({
                //     source: this.getSVGurl,    // Path to SVG map
                //     colors: {stroke: '#aaaaaa', selected: -20, hover: "#F3047A"},
                //     width: 1170,
                //     viewBox: [520,150,1350,1400],
                //     regions: reg,
                //     tooltipsMode:'custom',
                //     zoom: true,
                //     pan:true,
                //     cursor:'pointer',
                //     responsive:true,
                //     zoomLimit: [0,10]
                // });
        
                // $(".map_tooltip").css({"background-color": "#C607A9", "width":"300px"});
            }
        }
    })
  })
</script>

<style>
    .marker {
        background: url("//kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/7760d28d65f477cd66bd4756f9204c15/map_pin2.png") no-repeat;
        cursor: pointer;
        display: block;
        height: 65px;
        margin-top: 5px;
        outline: medium none;
        text-indent: -9999px;
        width: 45px;
    }
</style>