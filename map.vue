<template>
    <div>
        <div class="map_page">
            <div class="gray_bar">
                <div class="col-xs-10">
                    <input v-model="mobile_search_store" v-on:keyup.enter="showStoreDetails" class= "mobile_map_search" placeholder="Search Stores" >
                    <input v-model="mobile_find_store" class= "mobile_map_search" placeholder="Find a store near you" >
                </div>
                <img @click="swapSearchTerm" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1498848398000/Arrows Icon.png" class="search_icon" alt="">
                <div class="blue_dets_box hidden_now">
                    
                </div>
                <div class="green_dets_box hidden_now">
                    
                </div>
            </div>
            <div id="search_results_items" class="search-results-items" style="">
            <!--RENDERED BY renderSearchResultsTemplate(..) -->
            </div>
            <div class="map">
            
                <div class="demo_1 map3" style="">       
                
                    <img alt="map_image" id="map_image" v-bind:src="getSVGurl"> 
                    <!--v-bind:src={{getSVGurl}} src=-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("map-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
            title: "The Path!",
            description: "Using new SDK",
            mobile_search_store : "",
            mobile_find_store: ""
        }
      },
      computed: {
        property(){
            return this.$store.getters.getProperty;
        },
        getSVGurl : function () {
            return "https://www.mallmaverick.com" + this.property.svgmap_url;
        },
        showStoreDetails: function() {
            if(this.mobile_search_store != '') {
                $(".blue_dets_box").toggle();
            }
        }
      },
      methods: {
        swapSearchTerm: function () {
            var temp_search1 = this.mobile_search_store;
            this.mobile_search_store = this.mobile_find_store;
            this.mobile_find_store = temp_search1;
        }
      }
    })
  })
</script>