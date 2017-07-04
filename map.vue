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
                    <div class="blue_dets_box hidden_now">
                        <div class="close_dets pull-left">
                            <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                        </div>
                        <div class="more_dets pull-right">
                            <img @click="viewMoreDets1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt="">
                        </div>
                        <p class="dets_title">{{mobile_search_store}} </p>
                        
                    </div>
                    <div class="green_dets_box hidden_now">
                        <div class="close_dets pull-left">
                            <img @click="removeSearch2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                        </div>
                        <div class="more_dets pull-right">
                            <img @click="viewMoreDets2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt="">
                        </div>
                        <p class="dets_title">{{mobile_find_store}}</p>
                        
                        
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
            store1_name = "",
            store2_name = ""
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
            if(this.mobile_search_store != '') {
                $(".blue_dets_box").show();
                this.store1_name = findStoreBySlug();
            }
            else {
                $(".blue_dets_box").hide();
            }
        },
        showStore2Details: function() {
            if(this.mobile_find_store != '') {
                $(".green_dets_box").show();
                $(".blue_dets_box").addClass("lift_up");
                this.store2_name = findStoreBySlug();
            }
            else {
                $(".green_dets_box").hide();
                $(".blue_dets_box").removeClass("lift_up");
            }
        },
        findStoreBySlug (slug){
            return this.$store.getters.findStoreBySlug(slug);
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
             $(".blue_dets_box").hide();
        },
        removeSearch2 :function() {
            this.mobile_find_store = '';
             $(".green_dets_box").hide();
        },
        viewMoreDets1 :function() {
            this.mobile_find_store = '';
        },
        viewMoreDets2 :function() {
            this.mobile_find_store = '';
        }
      }
    })
  })
</script>