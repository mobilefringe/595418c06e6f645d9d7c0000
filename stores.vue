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
                    <div  v-for="(store, index) in dine_stores ">
                        <div class="row cat_name">
                            <router-link :to="{ name: 'mapStores', params: { id: index }}">
                                <div class="col-xs-6 align_left">
                                    {{index}}
                                    <!--{{store.name}} -->
                                    <br/>
                                    <!--{{store.property_id}}-->
                                </div>
                                <!--<div class="col-xs-6 align_right">-->
                                <!--    April 27-29-->
                                <!--</div>-->
                            </router-link>
                        </div>
                         <hr>
                    </div>
                </div>
                <hr>
            </div>
            <div class="all_caps cat_title" id="shop" v-on:click="toggle('shop')">
                Shop
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
             <hr>
             <div  v-show = "show_shop" class="" id="shop_store_list">
                <div class="" id="shop_stores_container">
                    <div  v-for="(store, index) in shop_stores">
                        <div class="row cat_name">
                            <router-link :to="{ name: 'mapStores', params: { id:  index }}">
                                <div class="col-xs-6 align_left">
                                    {{index}}
                                    <!--{{store.name}} -->
                                    <br/>
                                   <!--{{index}}-->
                                    <!--{{store.name}} {{store.property_id}}-->
                                </div>
                                <!--<div class="col-xs-6 align_right">-->
                                <!--    April 27-29-->
                                <!--</div>-->
                            </router-link>
                        </div>
                         <hr>
                    </div>
                </div>
                <hr>
            </div>
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
</template>

<script>
  define(["Vue","lodash"], function(Vue,_) {
    return Vue.component("stores-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          listMode: "alphabetical",
          dine_stores: [],
          shop_stores: [],
          play_stores: [],
          stay_stores: [],
          service_stores: [],
          show_dine : false,
          show_shop : false,
          show_play : false,
          show_stay : false,
          show_service : false
        }
      },
      created: function () {
        this.getStoreByCategory();
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
            var cats = this.storesByCategoryName;
            var dine_cats = ["Food", "Fast Food", "Coffee and Cafe","Coffee and Cafes","Coffee and Café","Food Court Eatery", "Food Exchange","Food Services",
            "Restaurant","Restaurants", "Specialtu Food & Drink", "Specialty Food & Drink", "Specialty Food", "Specialy Food"];
            var shop_cats = [" Jewellery","Apparel","Accessories", "Accessories & Luggage", "Beauty Product","Bedding","Cards & Stationary","Cards, Stationary and Gifts","Children's Apparel", "Children's Wear", "Drugstore","Electronics","Electronics, Computers and Telephones", "Electronics, Computers, and Telephones","Fashion","Fashion & Accessories", "Fashion Accessories","Flower","Flowers","General Variety"];
            var play_cats = ["ATTRACTIONS","Art Gallery"];
            var stay_cats = [];
            var service_cats = ["Automotive","Banking and Financial Services","Beauty Salon","Business Services","Dental","Dry Cleaning Services","Dry Clearers","Education","Eyewear","Eyewear and Health Services","Food Exchange","Food Services","Groceries","General Variety"];
            console.log(cats);
            var temp_dine_array = [];
            var temp_shop_array = [];
            $.each(cats, function(key,val) {
                
                if(dine_cats.includes(key)) {
                    if( temp_dine_array!== undefined && temp_dine_array.length > 0) {
                       temp_dine_array=temp_dine_array.concat(cats[key]);
                    }
                    else {
                        temp_dine_array.push.apply(temp_dine_array,cats[key]);
                    }
                }
                if(shop_cats.includes(key)) {
                    if( temp_shop_array!== undefined && temp_shop_array.length > 0) {
                       temp_shop_array=temp_shop_array.concat(cats[key]);
                    }
                    else {
                        temp_shop_array.push.apply(temp_shop_array,cats[key]);
                    }
                }
            });
            this.dine_stores = _.orderBy(temp_dine_array, 'name');
            this.dine_stores = _.groupBy(this.dine_stores, 'name');
            console.log(this.dine_stores);
            this.shop_stores = _.orderBy(temp_shop_array, 'name');
            this.shop_stores = _.groupBy(this.shop_stores, 'name');
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
