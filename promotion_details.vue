<template>
  <!--<div class="row" v-if="currentPromo">-->
  <!--  <div class="large-6 columns">-->
  <!--    <div>-->
  <!--      <h1>{{currentPromo.name}}</h1>-->
  <!--      <p><router-link :to="{ name: 'storeDetails', params: { id: currentPromo.store.slug }}">{{currentPromo.store.name}}</router-link> | {{currentPromo.start_date | moment("MMM D", timezone)}} - {{currentPromo.end_date | moment("MMM D", timezone)}}</p>-->
  <!--      <p>{{currentPromo.description}}</p>-->
  <!--      <img :src="currentPromo.image_url">-->
  <!--    </div>-->
  <!--  </div>-->
  <!--</div>-->
   <div >
        <!-- SVG Map diplay area -->
        <div class="demo_1 map3" style="" id="mapsvg">
            <img :src="currentPromo.image_url">
        </div>
        <div class="blue_box"  v-if="currentStore">
            <div class="close_dets  pull-left" @click="go_back">
                <a href="">
                    <img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501003074000/arrow_left_2x.png" class="" alt="">
                </a>
            </div >
            <p class="dets_title">{{currentPromo.name | uppercase}} </p>
            <p class="dets_data">
                {{currentStore.property_id}} - {{currentStore.store_hours_today.open_time | moment("h a ", timezone)}}  {{currentStore.store_hours_today.close_time | moment("h a z", timezone)}}
            </p>
        </div>
        </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
    return Vue.component("promo-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentPromo: null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentPromo = vm.findPromoBySlug(to.params.id);
          if (vm.currentPromo === null || vm.currentPromo === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentPromo = this.findPromoBySlug(to.params.id);
        if (this.currentPromo === null || this.currentPromo === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      computed: {
        findPromoBySlug () {
          return this.$store.getters.findPromoBySlug;
        },
        timezone() {
          return this.$store.getters.getTimezone;
        }
      }
    });
  });
</script>
