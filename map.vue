<template>
    <div>
        <div class="map_page">
            <div class="gray_bar">
                <div class="col-xs-10">
                    <input v-model="mobile_search_store" v-on:keyup="showStore1Details" class= "mobile_map_search" placeholder="Search Stores" >
                    <input v-model="mobile_find_store"  v-on:keyup="showStore2Details" class= "mobile_map_search" placeholder="Find a store near you" >
                </div>
                <img @click="swapSearchTerm" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1498848398000/Arrows Icon.png" class="search_icon" alt="">
                
            </div>
            <div id="search_results_items" class="search-results-items" style="">
            <!--RENDERED BY renderSearchResultsTemplate(..) -->
            </div>
            <div class="map">
            
                <div class="demo_1 map3" style="">       
                
                    <img alt="map_image" id="map_image" v-bind:src="getSVGurl"> 
                    <!--v-bind:src={{getSVGurl}} src=-->
                    <div v-show = "mobile_search_store" class="blue_dets_box" v-bind:class="{ lift_up: lift_blue_box }">
                        <div class="close_dets pull-left">
                            <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                        </div>
                        <div class="more_dets pull-right">
                            <router-link to="store1.slug"><img @click="viewMoreDets1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt=""></router-link>
                        </div>
                        <p class="dets_title">{{store1.name}} </p>
                        <p class="dets_data">{{store2.name}}</p>
                    </div>
                    <div  v-show = "mobile_find_store" class="green_dets_box">
                        <div class="close_dets pull-left">
                            <img @click="removeSearch2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                        </div>
                        <div class="more_dets pull-right">
                            <img @click="viewMoreDets2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt="">
                        </div>
                        <p class="dets_title">{{store2.name}}</p>
                        <p class="dets_data">{{store2.name}}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery"], function(Vue, $) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                title: "The Path!",
                description: "Using new SDK",
                mobile_search_store : "",
                mobile_find_store: "",
                lift_blue_box: false,
                store1: {},
                store2: {}
            }
        },
        watch: {
            mobile_find_store : function (val) {
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
            },
            showStore2Details: function() {
                this.store2 = this.findStoreBySlug("eatoncentrepath-nino-d-arena");
            },
            findStoreBySlug (){
                return this.$store.getters.findStoreBySlug;
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
                 //$(".blue_dets_box").hide();
            },
            removeSearch2 :function() {
                this.mobile_find_store = '';
                // $(".green_dets_box").hide();
            }
            ,
            // viewMoreDets1 :function() {
            //     this.mobile_find_store = '';
            // },
            // viewMoreDets2 :function() {
            //     this.mobile_find_store = '';
            // }
        }
    })
  })
</script>