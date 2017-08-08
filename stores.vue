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
            <div class="all_caps cat_title" id="play" v-on:click="toggle('play')">
                Play
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
            <hr>
            <div  v-show = "show_play" class="" id="shop_store_list">
                <div class="" id="play_stores_container">
                    <div  v-for="(store, index) in play_stores">
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
            <div class="all_caps cat_title" id="service" v-on:click="toggle('service')">
                Service
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
            <div class="all_caps cat_title" id="stay" v-on:click="toggle('stay')">
                Stay
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
            "Restaurant","Restaurants", "Specialtu Food & Drink", "Specialty Food & Drink", "Specialty Food", "Specialy Food","Healthy Choices","Take-out Restaurant"];
            var shop_cats = ["Apparel","Accessories", "Accessories & Luggage", "Beauty Product","Bedding","Cards & Stationary","Cards, Stationary and Gifts","Children's Apparel", "Children's Wear", "Drugstore","Electronics","Electronics, Computers and Telephones", "Electronics, Computers, and Telephones","Fashion","Fashion & Accessories", "Fashion Accessories","Flower","Flowers", "Footwear", "General Variety","Groceries","Grocery Store","Health & Beauty","Healthy Choices","Jewelery & Accessories"," Jewellery","Jewellery","Kids & Ladies Apparel","Kids Apparel","Ladies Apparel","Leather & Luggage","Leather and Luggage","Market Place","Men's Wear","Mens Apparel","Mens and Ladies Apparel","Mens, Ladies and Kids Apparel ","Music & Videos","Office Supplies","SPECIALTY SHOPS","Shoes","Specialty Apparel","Specialty ","Specialty Store","Specialty, News & Gifts","Sporting Goods & Athleticwear","Telephone,Computers, Electronics","Telephones","Unisex Apparel", "Women's Wear","florist"];
            var play_cats = ["ATTRACTIONS","Art Gallery","Lounge","Toys","Toys, Hobbies & Pets"];
            var stay_cats = ["Hotel","Lounge"];
            var service_cats = ["Automotive","Banking and Financial Services","Beauty Salon","Business Services","Dental","Dry Cleaning Services","Dry Clearers","Education","Eyewear","Eyewear and Health Services","Food Exchange","Food Services","Groceries","General Variety","Hair Salon","Health","Health & Wellness","Health Services","Management","News","Opitcal/Health/Beauty","Other","Personal Care","Personal Care & Health Service","Pharmacies & Drug Store","Photography & Photo Equipment","Post Office","Postal Services","Printing Services","Professional Services","Retail","SERVICES","Services","Services ","Services and Stores","Specialty Service","Specialty Services","Storage","Telephone,Computers, Electronics","Travel","Travel Agent","florist","health","services"];
            // console.log(cats);
            // console.log(this.allStores);
            // console.log(_.filter(this.allStores, function(o) { return _.includes(dine_cats,o.category_name); }));
            // var temp_dine_array = [];
            // var temp_shop_array = [];
            // $.each(cats, function(key,val) {
                
            //     if(dine_cats.includes(key)) {
            //         if( temp_dine_array!== undefined && temp_dine_array.length > 0) {
            //           temp_dine_array=temp_dine_array.concat(cats[key]);
            //         }
            //         else {
            //             temp_dine_array.push.apply(temp_dine_array,cats[key]);
            //         }
            //     }
            //     if(shop_cats.includes(key)) {
            //         if( temp_shop_array!== undefined && temp_shop_array.length > 0) {
            //           temp_shop_array=temp_shop_array.concat(cats[key]);
            //         }
            //         else {
            //             temp_shop_array.push.apply(temp_shop_array,cats[key]);
            //         }
            //     }
            // });
            this.dine_stores = _.orderBy(_.filter(this.allStores, function(o) { return _.includes(dine_cats,o.category_name); }), 'name');
            this.dine_stores = _.groupBy(this.dine_stores, 'name');
            
            this.shop_stores = _.orderBy(_.filter(this.allStores, function(o) { return _.includes(shop_cats,o.category_name); }), 'name');
            this.shop_stores = _.groupBy(this.shop_stores, 'name');
            
            this.play_stores = _.orderBy(_.filter(this.allStores, function(o) { return _.includes(play_cats,o.category_name); }), 'name');
            this.play_stores = _.groupBy(this.play_stores, 'name');
            
            this.stay_stores = _.orderBy(_.filter(this.allStores, function(o) { return _.includes(stay_cats,o.category_name); }), 'name');
            this.stay_stores = _.groupBy(this.stay_stores, 'name');
            
            this.service_stores = _.orderBy(_.filter(this.allStores, function(o) { return _.includes(service_cats,o.category_name); }), 'name');
            this.service_stores = _.groupBy(this.service_stores, 'name');
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
        },
        allStores() {
            return this.$store.getters.processedStores;
        }
      }
    });
  });
</script>
