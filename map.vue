<template>
    <div>
        <div class="position_relative map_search_page">
            <div class="gray_bar">
                <div class="col-xs-10">
                    <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect1" class="search1" placeholder="Search Stores" v-model="swapSearch ? search2 : search1">
                        <template slot="item" scope="option">
                            <article class="media ">
                                <p>
                                    <strong>{{ option.data.name }} @ {{option.data.property_id}}</strong>
                                </p>
                            </article>
                        </template>
                    </search-component>
                    <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect2" class="search2" placeholder="Find a store near you" v-model="swapSearch ? search1 : search2">
                        <template slot="item" scope="option">
                            <article class="media ">
                                <p>
                                    <strong>{{ option.data.name }} @ {{option.data.property_id}}</strong>
                                </p>
                            </article>
                        </template>
                    </search-component>
                </div>
                <img @click="swapSearchTerm" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1498848398000/Arrows Icon.png" class="search_icon" alt="">
            </div>
            <div class="map">
                <!--<div class="demo_1 map3" style="" id="mapsvg"></div>-->
                <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl"></svg-map>
                <div v-if = "store1" class="blue_dets_box">
                    <div class="close_dets pull-left">
                        <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                    </div>
                    <div class="more_dets pull-right">
                        <router-link :to="'stores/' +store1.slug">
                            <img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt="">
                        </router-link>
                    </div>
                    <p class="dets_title">{{store1.name}} </p>
                    <p class="dets_data">{{store1.property_id}}</p>
                </div>
                <div  v-if = "store2" class="green_dets_box">
                    <div class="close_dets pull-left">
                        <img @click="removeSearch2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                    </div>
                    <div class="more_dets pull-right">
                        <router-link :to="'stores/' +store2.path_url">
                            <img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt="">
                        </router-link>
                    </div>
                    <p class="dets_title">{{store2.name}}</p>
                    <p class="dets_data">{{store2.property_id}}</p>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery", "Raphael", "mm_mapsvg","mousewheel","vue!search-component","vue!svg-map"], function(Vue, $, Raphael, mapSvg,mousewheel,SearchComponent,SVGMapComponent) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        // props: {
        //     dataLoaded: {
        //         type: Boolean,
        //         required: true
        //     }
        // },
        data: function() {
            return {
                mobile_search_store : "",
                // mobile_find_store: "",
                lift_blue_box: false,
                store1: null,
                store2: null,
                map :{},
                suggestionAttribute: 'name',
                input1 : "",
                search_one : null,
                search_two : null,
                search1 : "",
                search2 : "",
                swapSearch : false
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
            // console.log(map);
            // this.map = map;
            // console.log(this.store1);
            // this.search_one = $('.search1').offset();
            // this.search_two = $('.search2').offset();
        },
        watch: {
            store1 : function () {
                
                    var mark = this.svgMapRef.addMarker(this.store1,'//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png');
                    if( mark !== null && mark != undefined) {
                        Vue.set(this.store1,'marker',mark[0]);
                        // console.log("store1 marker container",this.store1.marker);
                    }
                //   console.log("the mark1 is" ,this.store1);
                }
                
            },
            store2 : function () {
                if (this.store2 !== null && this.store2.marker == null && this.store2.marker == undefined) {
                    var mark = this.svgMapRef.addMarker(this.store2,'//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501693321000/map_pin_green_1x.png');
                    if(mark !== null && mark != undefined) {
                        Vue.set(this.store2,'marker',mark[0]);
                    }
                //   console.log("the mark2 is" ,this.store2);
                }
                
            }
        },
        computed: {
            property(){
                return this.$store.getters.getProperty;
            },
            getSVGurl : function () {
                return "https://www.mallmaverick.com" + this.property.svgmap_url;
            },
            showStore1Details: function() {
                this.store1 =  this.findStoreBySlug("tdcentre-starbucks-coffee--2");
                this.store1.path_url = "stores/" + this.store1.slug;
            },
            showStore2Details: function() {
                this.store2 = this.findStoreBySlug("eatoncentrepath-nino-d-arena");
                 this.store2.path_url = "stores/" + this.store2.slug;
            },
            findStoreBySlug (){
                return this.$store.getters.findStoreBySlug;
            },
            allStores() {
                return this.$store.getters.processedStores;
            },
            svgMapRef() {
                return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
            }
        },
         methods: {
            swapSearchTerm: function () {
                this.swapSearch = !this.swapSearch;
                console.log("swap");
                this.svgMapRef.hideMarkers();
                var temp_store1 = this.store1;
                this.store1 = this.store2;
                this.store2 = temp_store1;
                // if(this.store1 || this.store2) {
                //     var temp_cords1 =  $('.search1').offset();
                //     var temp_cords2 =  $('.search2').offset();
                //     $('.search1').offset( temp_cords2 );
                //     $('.search2').offset( temp_cords1 );
                //     var temp_placeholder =  $(".search1 input").attr("placeholder");
                //     $(".search1 input").attr("placeholder", $(".search2 input").attr("placeholder"));
                //     $(".search2 input").attr("placeholder",temp_placeholder );;
                // }
            },
            removeSearch1 :function() {
                // $(".search1 .input").val('');
                this.svgMapRef.removeMark (this.store1.id);
                this.search1 = "";
                this.store1 = null;
            },
            removeSearch2 :function() {
                // $(".search2 .input").val('');
                this.svgMapRef.removeMark (this.store2.id);
                this.search2 = "";
                this.store2 = null;
            },
            onOptionSelect1(option) {
                // if((this.search_one.left === $('.search1').offset().left) && (this.search_one.top === $('.search1').offset().top)) {
                this.store1 = option;
                // console.log("search1",this.search1);
                // }
                // else {
                //     this.store2 = option;
                // }   
            },
            onOptionSelect2(option) {
                // if((this.search_two.left === $('.search2').offset().left) && (this.search_two.top === $('.search2').offset().top)) {
                this.store2 = option;
                // console.log("search2",this.search2);
                // }
                // else {
                //     this.store1 = option;
                // }
            },
            removeDuplicates(myArr, prop) {
                return myArr.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
                });
            },
            updateSVGMap (map) {
                this.map = map;
            }
        }
    })
  })
</script>