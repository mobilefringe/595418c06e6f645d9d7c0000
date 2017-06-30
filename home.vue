<template>
  <!--<div class="row">-->
  <!--  <div class="large-6 columns">-->
  <!--    <div>-->
  <!--      <h1>{{title}}</h1>-->
  <!--      <p>{{description}}</p>-->
  <!--      <hr/>-->
  <!--      <h5>Translated text example:</h5>-->
  <!--      <p>{{ $t("message.hello") }}</p>-->
  <!--      <p>{{property.name}}</p>-->
  <!--      <hr/>-->
  <!--      <today-hours></today-hours>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--</div>-->
    <div class="home_page">
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
         <h4 class="all_caps home_title"> Discover The Toronto Path</h4>
        <div class="menu_btn_holder">
            <!--<a href="/"><label class="all_caps menu_btn">Your Location</label></a>-->
            <!--<a href="/stores"><label class="all_caps menu_btn">STORES</label></a>-->
            <!--<a href="/promotions"><label class="all_caps menu_btn">PROMOTIONS</label></a>-->
            <!--<a href="/map"><label class="all_caps menu_btn">PATH MAP</label></a>-->
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
  define(["Vue", 'fuse'], function(Vue,fuse) {
    return Vue.component("home-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
            title: "The Path!",
            description: "Using new SDK",
            results: [],
            mobile_search_box : "",
            eys:["store.name"]
        }
      },
      watch: {
        search() {
            console.log("Serach");
            if (this.mobile_search_box.trim() === '')
                this.result = this.list
            else
                this.result = fuse.search(this.mobile_search_box.trim())
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
