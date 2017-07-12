<template>
    <div class="stores_page">
        <div class="all_caps store_header">
            Stores Directory
        </div>
        <h4 class="all_caps home_title"> Discover The Toronto Path</h4>
        <div class="store_cat_listing">
            <div class="all_caps cat_title" id="dine" v-on:click="toggle('dine')">
                Dine
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
             <hr>
            <div  v-show = "show_dine" class="" id="dine_store_list">
                <div class="" id="dine_stores_container">
                    <div  v-for="store in dine_stores">
                        <div class="row cat_name">
                            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">
                                <div class="col-xs-6 align_left">
                                    {{store.name}}
                                    <br/>
                                    {{store.property_id}}
                                </div>
                                <div class="col-xs-6 align_right">
                                    April 27-29
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
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
  </div>
</template>

<!--<style>-->
<!--  .center{-->
<!--    text-align: center-->
<!--  }-->
<!--  .store-section a{-->
<!--    color: #708090;-->
<!--  }-->
<!--</style>-->

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("stores-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          listMode: "alphabetical",
          dine_stores: [],
          show_dine : false,
          show_dine : false,
          show_dine : false,
          show_dine : false,
          show_dine : false,
          
        }
      },
      created: function () {
        this.getStoreByCategory
      },
      methods: {
        changeMode (mode) {
          this.listMode = mode;
        },
        toggle: function (clicked) {
            if(clicked === "dine")
                this.show_dine = !this.show_dine;
            else if(clicked === "shop")
                this.show_shop = !this.show_shop;
            else if(clicked === "play")
                this.show_play = !this.show_play;
            else if(clicked === "stay")
                this.show_stay = !this.show_stay;
            else if(clicked === "service")
                this.show_service = !this.show_service;
        },
        getStoreByCategory() {
            //toggle value of show_dine
            //this.show_dine = !this.show_dine;
            console.log(this.show_dine);
            var cats = this.storesByCategoryName;
            console.log(cats);
            var dine_cats = ["Food", "Fast Food"];
            var shope_cats = ["Apparel"];
            
            var temp_dine_array = [];
            // var temp = $.grep(this.storesByCategoryName,function(key,val){
            //     console.log(key,val);
            //     return key ;
            // });
            // console.log(temp );
            // var array = $.map(this.storesByCategoryName, function(value, index) {
            //     return [value];
            // });
            //this.dine_stores.push("hello");
            //console.log(this.dine_stores);
            // console.log(dine_stores);
            $.each(cats, function(key,val) {
                //console.log(key);
                if(dine_cats.includes(key)) {
                   console.log(key );
                   if( temp_dine_array!== undefined && temp_dine_array.length > 0) {
                       console.log("data there");
                       temp_dine_array=temp_dine_array.concat(cats[key]);
                   }
                   else {
                       console.log(cats[key], "wink");
                        //this.dine_stores = cats[key];
                         temp_dine_array.push.apply(temp_dine_array,cats[key]);
                   }
                 
                }
            });
            this.dine_stores = temp_dine_array;
            console.log(this.dine_stores );
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
