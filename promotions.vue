<template>
    <div class="stores_page"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="all_caps store_header">
            Promotions
        </div>
        <h4 class="all_caps home_title"> Discover The Toronto Path</h4>
        <div v-if="sorted_promos" class="store_cat_listing" v-for="(store_promo, index) in sorted_promos">
            <div class="all_caps cat_title" :id="index" v-on:click="toggle(index)">
                {{store_promo[0].store.name}} @ {{store_promo[0].store.property_id}}
                <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498596224000/up_arrow_2x.png" class="up_arrow pull-right" alt="" v-show="store_promo[0].show_promo">
            </div>
             <hr>
            <div  v-show="store_promo[0].show_promo" class="">
                <div class="">
                    <div  v-for="promo in store_promo ">
                        <div class="row cat_name">
                            <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">
                                <div class="col-xs-6 align_left">
                                    {{promo.name}}
                                    <!--{{store.name}} -->
                                    <br/>
                                    <!--{{store.property_id}}-->
                                </div>
                                <div class="col-xs-6 align_right">
                                   {{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}
                                </div>
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
                sorted_promos: null
            }
        },
        created : function ()  {
            this.promo_by_stores;
        },
      computed: {
        promotions() {
          
          return this.$store.getters.processedPromos;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        },
        promo_by_stores () {
            var promo = _.groupBy(this.promotions, 'store.id');
            console.log(promo);
             o =_.sortBy(promo, 'name');
             console.log(o);
            //   _.orderBy(promo, 'store.name');
            this.sorted_promos = promo;
        }
      },
      methods : {
        toggle: function (index) {
            if(this.sorted_promos[index][0].show_promo == undefined || this.sorted_promos[index][0].show_promo == null) {
                Vue.set(this.sorted_promos[index][0],'show_promo', true);
            }
            else {
                this.sorted_promos[index][0].show_promo = !this.sorted_promos[index][0].show_promo;
            }
        }
      }
    });
  });
</script>
