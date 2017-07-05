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
        </div>
    </div>
</template>


<style>
    /*********MAP***********/
.map_page {
    position:relative;
    .gray_bar {
           padding: 5px 10px 10px 10px;
        img {
            padding: 25px 0;
        }
    }
}
.demo_1.map3 {
    position: relative;
}
.dets_title {
    font-size: 18px;
    color: #FFFFFF;
    padding: 10px 50px;
    margin: 0;
}
.dets_data {
    font-size: 16px;
    color: #FFFFFF;
    padding: 0px 50px 10px 50px;
    margin: 0;
}
.close_dets, .more_dets {
    width: 40px;
    height: 100%;
    display: inline-grid;
    text-align:center;
    padding: 10px;
}
.lift_up {
   bottom: 80px !important;
}
.blue_dets_box{
    background: #00BCE6;
    height: 80px;
    width: 100%;
    float: left;
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    .close_dets, .more_dets{
        background: #00B3DB;  
    }
    img {
        width:25px;
    }
}
.green_dets_box{
    background: #00B9A0;
    height: 80px;
    width: 100%;
    float: left;
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    .close_dets, .more_dets{
        background: #00AB93;  
    }
    img {
        width:25px;
    }
}
</style>

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
                this.store1.path_url = "stores/" + this.store1.slug;
            },
            showStore2Details: function() {
                this.store2 = this.findStoreBySlug("eatoncentrepath-nino-d-arena");
                 this.store2.path_url = "stores/" + this.store2.slug;
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
            },
            removeSearch2 :function() {
                this.mobile_find_store = '';
            }
        }
    })
  })
</script>
