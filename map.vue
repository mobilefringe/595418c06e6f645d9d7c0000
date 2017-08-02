<template>
    <div>
        <div class="position_relative map_search_page">
            <div class="gray_bar">
                <div class="col-xs-10">
                <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect1" class="search1">
                    <template slot="item" scope="option">
                        <article class="media ">
                            <p>
                                <strong>{{ option.data.name }} @ {{option.data.property_id}}</strong>
                            </p>
                        </article>
                    </template>
                </search-component>
                <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect2" class="search2">
                    <template slot="item" scope="option">
                        <article class="media ">
                            <p>
                                <strong>{{ option.data.name }} @ {{option.data.property_id}}</strong>
                            </p>
                        </article>
                    </template>
                </search-component>
                    <!--<input v-model="mobile_search_store" v-on:keyup="showStore1Details" class= "mobile_map_search" placeholder="Search Stores" >-->
                    <!--<input v-model="mobile_find_store"  v-on:keyup="showStore2Details" class= "mobile_map_search" placeholder="Find a store near you" >-->
                </div>
                <img @click="swapSearchTerm" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1498848398000/Arrows Icon.png" class="search_icon" alt="">
                
            </div>
            
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
                <div class="demo_1 map3" style="" id="mapsvg"></div>
            
                <!--<div class="demo_1 map3" style="">       -->
                
                <!--    <img alt="map_image" id="map_image" v-bind:src="getSVGurl"> -->
                    <!--v-bind:src={{getSVGurl}} src=-->
                <!--    <div v-show = "mobile_search_store" class="blue_dets_box" v-bind:class="{ lift_up: lift_blue_box }">-->
                <!--        <div class="close_dets pull-left">-->
                <!--            <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">-->
                <!--        </div>-->
                <!--        <div class="more_dets pull-right">-->
                <!--            <router-link v-bind:to="store1.path_url"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></router-link>-->
                <!--        </div>-->
                <!--        <p class="dets_title">{{store1.name}} </p>-->
                <!--        <p class="dets_data">Building Name {{store1.name}}</p>-->
                <!--    </div>-->
                <!--    <div  v-show = "mobile_find_store" class="green_dets_box">-->
                <!--        <div class="close_dets pull-left">-->
                <!--            <img @click="removeSearch2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">-->
                <!--        </div>-->
                <!--        <div class="more_dets pull-right">-->
                <!--        <router-link v-bind:to="store2.path_url"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></router-link>-->
                            
                <!--        </div>-->
                <!--        <p class="dets_title">{{store2.name}}</p>-->
                <!--        <p class="dets_data">Building Name {{store2.name}}</p>-->
                        
                <!--    </div>-->
                <!--</div>-->
            </div>
            <div v-show = "mobile_search_store" class="blue_dets_box" v-bind:class="{ lift_up: lift_blue_box }">
                <div class="close_dets pull-left">
                    <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                </div>
                <div class="more_dets pull-right">
                    <router-link v-bind:to="store1.path_url"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></router-link>
                </div>
                <p class="dets_title">{{store1.name}} </p>
                <p class="dets_data">Building Name {{store1.name}}</p>
            </div>
            <div  v-show = "mobile_find_store" class="green_dets_box">
                <div class="close_dets pull-left">
                    <img @click="removeSearch2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                </div>
                <div class="more_dets pull-right">
                <router-link v-bind:to="store2.path_url"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></router-link>
                    
                </div>
                <p class="dets_title">{{store2.name}}</p>
                <p class="dets_data">Building Name {{store2.name}}</p>
                
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery", "mm_mapsvg","mousewheel","raphael","vue!search-component"], function(Vue, $,mapsvg,mousewheel,raphael,SearchComponent) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                mobile_search_store : "",
                mobile_find_store: "",
                lift_blue_box: false,
                store1: {},
                store2: {},
                map :{},
                suggestionAttribute: 'name'
            }
        },
        mounted: function (){
            var map = $('#mapsvg').mapSvg({
                source: this.getSVGurl,    // Path to SVG map
                colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
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
        },
        watch: {
            store2 : function (val) {
                if(val != '') {
                    this.lift_blue_box = true
                }
               else {
                    this.lift_blue_box = false;
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
            processedStores() {
                // $(".options-list").addClass("scrollable-menu");
                return this.removeDuplicates(this.allStores, 'name');
            },
            allStores() {
                return this.$store.getters.processedStores;
            }
        },
         methods: {
            swapSearchTerm: function () {
                var temp_search1 = this.mobile_search_store;
                this.mobile_search_store = this.mobile_find_store;
                this.mobile_find_store = temp_search1;
            },
            removeSearch1 :function() {
                this.mobile_search_store = '';
            },
            removeSearch2 :function() {
                this.mobile_find_store = '';
            },
            onOptionSelect1(option) {
                console.log('Selected option:', option);
                var counted_stores = _.countBy(this.allStores,'name');
                this.store1 = option;
                // console.log($(".search1 input").val());
                // console.log($(".search2 input").val());
            },
            onOptionSelect2(option) {
                console.log('Selected option:', option);
                var counted_stores = _.countBy(this.allStores,'name');
                this.store2 = option;
                // console.log($(".search1 input").val());
                // console.log($(".search2 input").val());
            },
            removeDuplicates(myArr, prop) {
                return myArr.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
                });
            }
        }
    })
  })
</script>