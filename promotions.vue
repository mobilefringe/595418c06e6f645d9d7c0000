<template>
  <div class="stores_page"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="all_caps store_header">
            Promotions
        </div>
        <h4 class="all_caps home_title"> Discover The Toronto Path</h4>
        <div class="store_cat_listing" v-for="(store_promo, index) in promo_by_stores">
            <div class="all_caps cat_title" id="dine" v-on:click="toggle(index)">
                {{index}}
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right hidden_now" alt="">
            </div>
             <hr>
            <div  v-show = "store_promo.show_promo" class="" id="dine_store_list">
                <div class="" id="dine_stores_container">
                    <div  v-for="promo in store_promo ">
                        <div class="row cat_name">
                            <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">
                                <div class="col-xs-6 align_left">
                                    {{promo.name}}
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
        </div>
    <!--<div class="columns large-3 medium 6" v-for="promo in promotions">-->
    <!--  <div class="card">-->
    <!--    <div class="card-divider">-->
    <!--      {{ promo.name }}-->
    <!--    </div>-->
    <!--    <div class="card-section center">-->
    <!--      <a :href="promo.image_url" target="_blank"><img :src="promo.image_url"></a>-->
    <!--    </div>-->
    <!--    <div class="card-section">-->
    <!--      <div class="center">-->
    <!--        <p>{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>-->
    <!--        <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">Read More</router-link>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</div>-->
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
  define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
    Vue.use(Meta);
    return Vue.component("promos-component", {
      template: template, // the variable template will be injected
       data: function() {
            return {
                sorted_promos: this.promo_by_stores
            }
        },
      computed: {
        promotions() {
          
          return this.$store.getters.processedPromos;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        },
        promo_by_stores () {
            var promo = _.groupBy(this.promotions, 'store.name');
            console.log(promo);
            return promo;
        }
      },
      methods : {
        toggle: function (index) {
            this.sorted_promos[index].show_promo = !this.sorted_promos[index].show_promo;
            console.log(this.sorted_promos[index]);
            
            // val.show_promo = !val.show_promo;
        }
      }
    });
  });
</script>
