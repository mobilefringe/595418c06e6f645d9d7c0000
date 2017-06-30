<template>
    <div>
        <div class="map_page">
            <div class="gray_bar">
                <div id="mobile_search"  class="col-xs-10">
                    <!--<form id="mobile_search_form" class="no_margin">-->
                    <!--    <input id="mobile_search_box" type="text" placeholder="Search All Path Stores" title="search" />-->
                    <!--</form>-->
                    <input v-model="mobile_search_box" id="mobile_search_box" placeholder="Search All Path Stores" >
                </div>
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498575328000/Search Icon.png" class="search_icon" alt="">
            </div>
            <div id="search_results_items" class="search-results-items" style="">
            <!--RENDERED BY renderSearchResultsTemplate(..) -->
            </div>
            <div class="map">
            
                <div class="demo_1 map3" style="">       
                Hello
            <!--        <img alt="map_image" id="map_image" v-bind:src={{getSVGurl}} />   -->
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
            mobile_search_box : "",
            svg_map_url: ""
        }
      },
      computed: {
        property(){
          return this.$store.getters.getProperty;
        },
        getSVGurl : function () {
            return property.svgmap_url;
        }
      }
    })
  })
</script>