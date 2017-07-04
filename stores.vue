<template>
    <div class="stores_page">
        <div class="all_caps store_header">
            Stores Directory
        </div>
        <h4 class="all_caps home_title"> Discover The Toronto Path</h4>
        <div class="store_cat_listing">
            <div class="all_caps cat_title" id="dine">
                Dine
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
             <hr>
            <div class="all_caps cat_title" id="shop">
                Shop
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
             <hr>
            <div class="all_caps cat_title" id="play">
                Play
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
            <hr>
            <div class="all_caps cat_title" id="service">
                Service
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
             <hr>
            <div class="all_caps cat_title" id="stay">
                Stay
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
             <hr>
        </div>
    </div>

  <div class="container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
    <ul class="menu">
      <li><a v-on:click="changeMode('alphabetical')">Alphabetical</a></li>
      <li><a v-on:click="changeMode('category')">Category</a></li>
    </ul>
    <hr/>
    <div class="columns large-12" v-for="(stores, index) in storesByAlphaIndex" v-if="listMode === 'alphabetical'">
      <div class="list_header">
        <b>{{index}}</b>
        <hr/>
      </div>
      <div class="store-section" v-for="store in stores">
        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>
        <hr/>
      </div>
      <!-- <div class="card">
        <div class="card-divider">
          {{ store.name }}
        </div>
        <div class="card-section center">
          <a :href="store.image_url" target="_blank"><img :src="store.image_url"></a>
        </div>
        <div class="card-section">
          <div class="center">
            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">View Details</router-link>
          </div>
        </div>
      </div> -->
    </div>
    <div class="columns large-12" v-for="(stores, index) in storesByCategoryName" v-if="listMode === 'category'">
      <div class="list_header">
        <b>{{index}}</b>
        <hr/>
      </div>
      <div class="store-section" v-for="store in stores">
        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>
        <hr/>
      </div>
    </div>
  </div>
</template>

<style>
  .center{
    text-align: center
  }
  .store-section a{
    color: #708090;
  }
</style>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("stores-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          listMode: "alphabetical"
        }
      },
      methods: {
        changeMode (mode) {
          this.listMode = mode;
        }
      },
      computed: {
        storesByAlphaIndex() {
            return this.$store.getters.storesByAlphaIndex;
        },
        storesByCategoryName() {
            return this.$store.getters.storesByCategoryName;
        },
        findStoreBySlug (){
            return this.$store.getters.findStoreBySlug;
        }
      }
    });
  });
</script>
