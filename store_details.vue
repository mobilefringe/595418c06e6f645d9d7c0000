<template>
  <div class="row" v-if="currentStore">
    <!--<div class="large-6 columns">-->
    <!--  <div>-->
    <!--    <h1>{{currentStore.name}}</h1>-->
    <!--    <p>{{currentStore.description}}</p>-->
    <!--    <a v-bind:href="currentStore.website">{{currentStore.website}}</a>-->
    <!--  </div>-->
    <!--</div>-->
        <div class="demo_1 map3" style="" id="mapsvg">
        </div>
  </div>
</template>

<script>
  define(["Vue", "jquery", "mm_mapsvg","mousewheel","raphael"], function(Vue, $,mapsvg,mousewheel,raphael) {
    return Vue.component("store-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          title: "The Path!",
          description: "An example of integration of Mall Maverick with Vue.js",
          currentStore: null,
          map: {}
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentStore = vm.findStoreBySlug(to.params.id);
          if (vm.currentStore === null || vm.currentStore === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentStore = this.findStoreBySlug(to.params.id);
        if (this.currentStore === null || this.currentStore === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      mounted : function (){
        this.loadMap();
      },
      computed: {
        property(){
            return this.$store.getters.getProperty;
        },
        findStoreBySlug () {
          return this.$store.getters.findStoreBySlug;
        },
        getSVGurl : function () {
            return "https://www.mallmaverick.com" + this.property.svgmap_url;//this.property.svgmap_url;
        }
      }, 
      methods : {
         loadMap() {
             console.log( this.getSVGurl);
            var map = $('#mapsvg').mapSvg({
                    source: this.getSVGurl,    // Path to SVG map
                    colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                    // viewBox: [3000,0,6000,6000],
                    disableAll: true,
                    height:1000,
                    width:1300,
                    tooltipsMode:'custom',
                    loadingText: "loading...",
                    zoom: true,
                    zoomButtons: {'show': true,'location': 'left' },
                    pan:true,
                    cursor:'pointer',
                    responsive:true,
                    zoomLimit: [0,10]
                });
         }
      }
    });
  });
</script>
