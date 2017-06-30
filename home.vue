<template>
    <div class="home_page">
        <div class="gray_bar">
            <div id="mobile_search"  class="col-xs-10">
                <input v-model="mobile_search_box" id="mobile_search_box" placeholder="Search All Path Stores" >
            </div>
            <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498575328000/Search Icon.png" class="search_icon" alt="">
        </div>
        <div id="search_results_items" class="search-results-items" style="">
        <!--RENDERED BY renderSearchResultsTemplate(..) -->
        </div>
         <h4 class="all_caps home_title"> Discover The Toronto Path</h4>
        <div class="menu_btn_holder">
            <router-link tag="li" to="/location" active-class="active" class="all_caps menu_btn" exact>
                <a class="all_caps menu_btn_label">YOUR LOCATION</a>
            </router-link>
            <router-link tag="li" to="/stores" active-class="active" class="all_caps menu_btn" exact>
                  <a class="all_caps menu_btn_label">STORES</a>
            </router-link>
            <router-link tag="li" to="/promotions" active-class="active" class="all_caps menu_btn" exact>
                  <a class="all_caps menu_btn_label">PROMOTIONS</a>
            </router-link>
             <router-link tag="li" to="/map" active-class="active" class="all_caps menu_btn" exact>
                  <a class="all_caps menu_btn_label">PATH MAP</a>
            </router-link>
        </div>
    </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("home-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
            title: "The Path!",
            description: "Using new SDK",
            mobile_search_box : ""
        }
      },
      computed: {
        property(){
          return this.$store.getters.getProperty;
        }
      }
    })
  })
</script>
