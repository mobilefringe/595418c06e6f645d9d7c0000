<template>
    <div >
        <div class="demo_1 map3" style="" id="mapsvg">
        </div>
        <div class="blue_box"  v-if="currentStore">
            <div class="close_dets  pull-left" >
                <a :href="concatVal('/stores/',currentStore.slug)"><img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501003074000/arrow_left_2x.png" class="" alt=""></a>
            </div >
            <p class="dets_title">{{currentStore.name | uppercase}} </p>
            <p class="dets_data">{{currentStore.property_id}} - {{currentStore.store_hours_data.open_time | moment("h a", timezone)}}  {{currentStore.store_hours_data.close_time | moment("h a", timezone)}}</p>
            
        </div>
        <div class="store_dets"  v-if="currentStore">
            <div class="row">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                {{currentStore.property_id}}
            </div>
            <div class="row">
                <i class="fa fa-globe" aria-hidden="true"></i>
                {{currentStore.website}}
            </div>
            <div class="row">
                <i class="fa fa-phone" aria-hidden="true"></i>
                {{currentStore.phone}}
            </div>
        </div> 
        <div class="blue_box"  v-if="currentStore" @click="togglePromo">
            
            <p class="dets_title">Promotions </p>
            <!--<p class="dets_data">{{currentStore.property_id}} - {{currentStore.store_hours_data.open_time | moment("h a", timezone)}}  {{currentStore.store_hours_data.close_time | moment("h a", timezone)}}</p>-->
            
        </div>
        <div  v-show = "show_promo" class="" id="" v-if="currentStore">
            <div v-if="currentStore.total_published_promos > 0">
                <div v-for="promo in all_promos">
                    {{promo.name}} - {{promo.date}}
                </div>
            </div>
            <div v-else>
                Sorry, There are no promotions available now. Check back later!
            </div>
        </div>
  </div>
</template>

<script>
define(["Vue", "jquery", "mm_mapsvg","mousewheel","raphael", "moment", "moment-timezone", "vue-moment"], function(Vue, $,mapsvg,mousewheel,raphael, moment, tz, VueMoment) {
    return Vue.component("store-details-component", {
        template: template, // the variable template will be injected,
        data: function() {
            return {
                title: "The Path!",
                description: "An example of integration of Mall Maverick with Vue.js",
                currentStore: null,
                map: {},
                all_hours:{},
                show_promo : false,
                all_promos: []
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // access to component instance via `vm`
                vm.currentStore = vm.findStoreBySlug(to.params.id);
                this.currentStore = vm.currentStore;
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
                _.forEach(this.currentStore.promotions, function(val, key) {
                    Vue.set(this.all_promos,'store_hours_data', val);
                });
                findPromoBySlug
                
            },
            all_hours : function () {
                console.log(this.all_hours);
                console.log(this.currentStore.todays_hour);
                // this.store_hours =  _.find(this.all_hours, 'id', this.currentStore.todays_hour);
                _.forEach(this.all_hours, function(val, key) {
                    // console.log(val.id);
                    if(val.id == this.currentStore.todays_hour)
                    {
                       
                        this.store_hours = val;
                        // console.log(val.id, val);
                        // console.log(this.store_hours);
                        Vue.set(this.currentStore,'store_hours_data', val);
                        return false;
                    }
                });
                 console.log(this.currentStore);
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
            },
            timezone() {
              return this.$store.getters.getTimezone;
            },
            findPromoBySlug () {
                return this.$store.getters.findPromoBySlug;
            }
        }, 
        methods : {
            loadMap(map) {
        
                // console.log(map);
                var val = this.currentStore;
                var coords = map.get_coords(val.svgmap_region);
                var height = parseInt(coords["height"])
                var width = parseInt(coords["width"])
                var x_offset = (parseInt(width) / 2);
                var y_offset = (parseInt(height) /2);
        
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
            togglePromo (){
                this.show_promo = ! this.show_promo;
            }
        }
    });
});
</script>
