<template>
    <div >
        <!-- SVG Map diplay area -->
        <div class="demo_1 map3" style="" id="mapsvg">
        </div>
        <div class="blue_box"  v-if="currentStore">
            <div class="close_dets  pull-left" >
                <a :href="concatVal('/stores/',currentStore.slug)">
                    <img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501003074000/arrow_left_2x.png" class="" alt="">
                </a>
            </div >
            <p class="dets_title">{{currentStore.name | uppercase}} </p>
            <p class="dets_data">
                {{currentStore.property_id}} - {{currentStore.store_hours_today.open_time | moment("h a", timezone)}}  {{currentStore.store_hours_today.close_time | moment("h a", timezone)}}
            </p>
        </div>
        <!-- Store Details -->
        <div class="store_dets"  v-if="currentStore">
            <div class="row">
                <i class="fa fa-map-marker col-xs-1" aria-hidden="true"></i>
                <p class="wrap col-xs-10">{{currentStore.property_id}}</p>
            </div>
            <div class="row">
                <i class="fa fa-globe col-xs-1" aria-hidden="true"></i>
                <p class="wrap col-xs-10">{{currentStore.website}}</p>
            </div>
            <div class="row">
                <i class="fa fa-phone col-xs-1" aria-hidden="true"></i>
                <p class="wrap col-xs-10">{{currentStore.phone}}</p>
            </div>
        </div> 
        <!-- Store Promotions -->
        <div class="blue_box promo"  v-if="currentStore" @click="togglePromo">
            <p class="dets_title">Promotions </p>
        </div>
        <div  v-show = "show_promo" class="" id="" v-if="currentStore">
            <div class="" v-if="currentStore.total_published_promos > 0">
                <div class="row promo_row" v-for="promo in all_promos">
                    <div class="disp_table">
                        <p class="col-xs-8 pull-left disp_table_cell">
                            {{promo.name}}
                        </p>
                        <p class="col-xs-4 pull-right align_right disp_table_cell">
                            {{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}
                        </p>
                    </div>
                    <hr/>
                </div>
            </div>
            <div v-else>
                Sorry, There are no promotions available now. Check back later!
            </div>
        </div>
        <!-- Store Hours -->
        <div class="blue_box promo"  v-if="currentStore" @click="toggleHours">
            <p class="dets_title">Full Hours</p>
        </div>
        <div  v-show = "show_hours" class="" id="" v-if="currentStore">
            <!--<div class="" v-if="currentStore.total_published_promos > 0">-->
                <div class="row" v-for="day in currentStore.store_hours_data">
                    <div v-if="!day.is_holiday" class="disp_table">
                        <p class="col-xs-8 pull-left disp_table_cell">
                            {{day.day_of_week}}
                        </p>
                        <p class="col-xs-4 pull-right align_right disp_table_cell" v-if="!day.is_closed">
                            {{day.open_time | moment("h a", timezone)}}  {{day.close_time | moment("h a", timezone)}}
                        </p>
                         <p class="col-xs-4 pull-right align_right disp_table_cell" v-else>
                            Closed
                        </p>
                    </div>
                    
                    <div v-else id="holiday_hours">
                        <hr/>
                        <p class="col-xs-8 pull-left disp_table_cell">
                            {{day.holiday_name}}
                        </p>
                        <p class="col-xs-4 pull-right align_right disp_table_cell" v-if="!day.is_closed">
                            {{day.open_time | moment("h a", timezone)}}  {{day.close_time | moment("h a", timezone)}}
                        </p>
                         <p class="col-xs-4 pull-right align_right disp_table_cell" v-else>
                            Closed
                        </p>
                    </div>
                </div>
            <!--</div>-->
            
        </div>
    </div>
</template>

<script>
define(["Vue", "jquery", "mm_mapsvg","mousewheel","raphael", "moment", "moment-timezone", "vue-moment"], function(Vue, $,mapsvg,mousewheel,raphael, moment, tz, VueMoment) {
    return Vue.component("store-details-component", {
        template: template, // the variable template will be injected,
        data: function() {
            return {
                currentStore : null,
                map : {},
                all_hours : {},
                show_promo : false,
                show_hours : false,
                all_promos : []
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
                // var val = this.currentStore;
                // regions = {};
                
                // obj = {};
                // if(val.store_front_url_abs.indexOf('missing.png') > -1){
                //     obj["tooltip"] = "<div class='tooltip_div'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                // }
                // else{
                //     obj["tooltip"] = "<div class='tooltip_div'><img src='" + val.store_front_url_abs + "'><p class='tooltip_name text-center'>"+val.name+"</p></div>"
                // }
                // obj["attr"] = {}
                // regions[val.svgmap_region] = obj;
            
                var map = $('#mapsvg').mapSvg({
                    source: this.getSVGurl,    // Path to SVG map
                    colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                    // viewBox: [3000,0,6000,6000],
                    disableAll: true,
                    height:200,
                    width:1300,
                    // regions: regions,
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
                
                var store_promo = _.groupBy(this.promotions(), 'id');
                var temp_promo=[];
                _.forEach(this.currentStore.promotions, function(val, key) {
                    var promo =store_promo[val];
                    // console.log(promo, val);
                    temp_promo.push(promo[0]);
                });
                this.all_promos = temp_promo;
                // console.log(this.all_promos);
            },
            all_hours : function () {
                var store_hours = _.groupBy(this.all_hours, 'id');
                Vue.set(this.currentStore,'store_hours_today', store_hours[this.currentStore.todays_hour]);
                
                 var temp_hours=[];
                _.forEach(this.currentStore.store_hours, function(val, key) {
                    var hours =store_hours[val];
                    console.log(hours, val);
                    hours.day_of_week = moment(val.open_time).day();
                    console.log(moment(val.open_time).day());
                    temp_hours.push(hours[0]);
                });
                Vue.set(this.currentStore,'store_hours_data', temp_hours);
                // _.forEach(this.all_hours, function(val, key) {
                //     // console.log(val.id);
                //     if(val.id == this.currentStore.todays_hour)
                //     {
                       
                //         this.store_hours = val;
                //         // console.log(val.id, val);
                //         // console.log(this.store_hours);
                        
                //         return false;
                //     }
                // });
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
            togglePromo () {
                this.show_promo = ! this.show_promo;
            },
            toggleHours () {
                 this.show_hours = ! this.show_hours;
            },
            promotions() {
                return this.$store.getters.processedPromos;
            },
            getDay(day_of_week) {
                var day= "";
                switch(day_of_week) {
                    case 0:
                        day = "Sunday";
                        break;
                    case 1:
                        day = "Monday";
                        break;
                    case 2:
                        day = "Tuesday";
                        break;
                    case 3:
                        day = "Wednesday";
                        break;
                    case 4:
                        day = "Thursday";
                        break;
                    case 5:
                        day = "Friday";
                        break;
                    case 6:
                        day = "Saturday";
                        break;
                }
            }
        }
    });
});
</script>
