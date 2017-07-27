<style>
    .blue_dets_box{
    background: #00BCE6;
    height: 80px;
    width: 100%;
    float: left;
    position:relative;
    left: initial;
    bottom: initial;
    z-index: 1;
    box-shadow: 1px -1px 3px 0 rgba(0,0,0,0.50);
    .close_dets, .more_dets{
        background: #00B3DB;  
    }
    img {
        width:25px;
    }
}
</style>
<template>
  <!--<div class="row" v-if="currentStore">-->
    <!--<div class="large-6 columns">-->
    <!--  <div>-->
    <!--    <h1>{{currentStore.name}}</h1>-->
    <!--    <p>{{currentStore.description}}</p>-->
    <!--    <a v-bind:href="currentStore.website">{{currentStore.website}}</a>-->
    <!--  </div>-->
    <!--</div>-->
    <div >
        <div class="demo_1 map3" style="" id="mapsvg">
        </div>
        <div class="blue_dets_box"  v-if="currentStore">
            <!--<div class="close_dets pull-left">-->
            <!--    <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">-->
            <!--</div>-->
            
            <div class="close_dets  pull-left" >
                <a :href="concatVal('/stores/',currentStore.slug)"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501003074000/arrow_left_2x.png" class="" alt=""></a>
            </div>
            <p class="dets_title">{{currentStore.name | uppercase}} </p>
            <p class="dets_data">{{currentStore.property_id}}</p>
            <p class="dets_data">{{store_hours}}</p>
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
          map: {},
          all_hours:{},
          store_hours: {}
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentStore = vm.findStoreBySlug(to.params.id);
          this.currentStore = vm.currentStore;
          console.log(this.currentStore);
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
      created () {
        
      },
      mounted : function (){
          
      },
      watch: {
            currentStore : function () {
                var val = this.currentStore;
                regions = {};
                
                obj = {};
                if(val.store_front_url_abs.indexOf('missing.png') > -1){
                    obj["tooltip"] = "<div class='tooltip_div'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                }
                else{
                    obj["tooltip"] = "<div class='tooltip_div'><img src='" + val.store_front_url_abs + "'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                }
                obj["attr"] = {}
                regions[val.svgmap_region] = obj;
            
                var map = $('#mapsvg').mapSvg({
                    source: this.getSVGurl,    // Path to SVG map
                    colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                    // viewBox: [3000,0,6000,6000],
                    disableAll: true,
                    height:200,
                    width:1300,
                    regions: regions,
                    tooltipsMode:'custom',
                    loadingText: "loading...",
                    zoom: true,
                    zoomButtons: {'show': true,'location': 'left' },
                    pan:true,
                    cursor:'pointer',
                    responsive:true,
                    zoomLimit: [0,10]
                });
                this.loadMap(map);
                this.all_hours = this.state.results.hours; 
                
            },
            all_hours : function () {
                console.log(this.all_hours);
                console.log(this.currentStore.todays_hour);
                this.store_hours =  _.find(this.all_hours, [ 'id', this.currentStore.todays_hour]); 
                 console.log(this.store_hours);
            }
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
        },
        state () {
            return this.$store.state;
        }
      }, 
      methods : {
         loadMap(map) {
            
            console.log(map);
            var val = this.currentStore;
            var coords = map.get_coords(val.svgmap_region);
            var height = parseInt(coords["height"])
            var width = parseInt(coords["width"])
            var x_offset = (parseInt(width) / 2);
            var y_offset = (parseInt(height) /2);
            
                
            // map.setMarks([{ xy: [coords["x"]  + x_offset, coords["y"] + y_offset],
            map.setMarks([{ xy: [coords["x"]  - 25 + x_offset, coords["y"] -68 + y_offset],
                attrs: {
                    src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500565442000/map_pin.png',   // image for marker
                    href: '/stores/'+val.slug,
                    tooltip :val.name
                },
                tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
            }]);
            map.setViewBox(val.svgmap_region);
            // map.selectRegion(val.svgmap_region);
         },
        concatVal(val1,val2) {
            return val1 + val2;
        },
        getTodaysStoreHours (){
        try {
            // let store_hour_id = this.currentStore.todays_hour;
            // console.log(store_hour_id);
            // let property = this.property;
            // console.log(property);
            // let timezone = property.timezone_moment;
            // this.all_hours = this.state.results.hours;
            // console.log("all_hours", all_hours);
            // var todayHours = _.find(all_hours, { 'id': store_hour_id});//hours.find(hour => hour.day_of_week === moment().day());
            // console.log("todayHours", todayHours);
            // return todayHours;
        }
        catch (err) {
          return null;
        }
      }
      }
    });
  });
</script>
