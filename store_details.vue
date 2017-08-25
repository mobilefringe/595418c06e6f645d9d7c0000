<template>
    <div id="store_details">
        <!-- SVG Map diplay area -->
        <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl" v-once></svg-map>
        <div class="blue_box"  v-if="currentStore">
            <div class="close_dets  pull-left" @click="go_back">
                <a href="">
                    <img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501003074000/arrow_left_2x.png" class="" alt="">
                </a>
            </div >
            <p class="dets_title">{{currentStore.name | uppercase}} </p>
            <p class="dets_data">
                {{currentStore.property}} 
                <span v-if="currentStore.todays_hour != null"> - {{currentStore.store_hours_today.open_time | moment("h a ", timezone)}}  {{currentStore.store_hours_today.close_time | moment("h a z", timezone)}}</span>
            </p>
        </div>
        <!-- Store Details -->
        <div class="store_dets"  v-if="currentStore">
            <div class="row" v-show="currentStore.property_address1">
                <i class="fa fa-map-marker col-xs-1" aria-hidden="true"></i>
                <p class="wrap col-xs-10">{{currentStore.property_address1}}</p>
            </div>
            <div class="row"  v-show="currentStore.website">
                <i class="fa fa-globe col-xs-1" aria-hidden="true"></i>
                <p class="wrap col-xs-10"><a :href="currentStore.website">{{currentStore.website}}</a></p>
            </div>
            <div class="row" v-show="currentStore.phone">
                <i class="fa fa-phone col-xs-1" aria-hidden="true"></i>
                <p class="wrap col-xs-10"><a :href="'tel:' +currentStore.phone">{{currentStore.phone}}</a></p>
                
            </div>
        </div> 
        <!-- Store Promotions -->
        <div class="blue_box promo"  v-if="currentStore" @click="show_promo = !show_promo">
            <p class="dets_title">{{$t("menu.promotions")}} {{show_promo}} </p>
        </div>
        <div  v-show = "show_promo" class="" id="" v-if="currentStore">
            <div class="" v-if="currentStore.promotionslength > 0">
                <div class="row promo_row" v-for="promo in all_promos">
                    <div class="">
                        <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">
                            <p class="col-xs-7 pull-left disp_table_cell">
                                {{promo.name}}
                            </p>
                            <p class="col-xs-5 pull-right align_right disp_table_cell">
                                {{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}
                            </p>
                        </router-link>
                        
                    </div>
                    <hr/>
                </div>
            </div>
            <div v-else class="padding_1010">
                {{$t("message.noPromoMessage")}}
            </div>
        </div>
        <!-- Store Hours -->
        <div class="blue_box promo"  v-if="currentStore" @click="show_hours = !show_hours">
            <p class="dets_title">{{$t("message.fullHours")}} {{show_hours}}</p>
        </div>
        <div  v-show = "show_hours" class="padding_1010" id="" v-if="currentStore">
            <div class="row" v-for="day in currentStore.store_hours_data" v-if="currentStore.store_hours_data[0] !== null">
                <div v-if="!day.is_holiday" class="">
                    <p class="col-xs-7 pull-left disp_table_cell">
                        {{getDay(day.day_of_week)}}
                    </p>
                    <p class="col-xs-5 pull-right align_right disp_table_cell" v-if="!day.is_closed">
                        {{day.open_time | moment("h a", timezone)}} - {{day.close_time | moment("h a", timezone)}}
                    </p>
                    <p class="col-xs-5 pull-right align_right disp_table_cell" v-else>
                         {{$t("message.closed")}}
                    </p>
                </div>
                
                <div v-else id="holiday_hours">
                    <hr/>
                    <p class="col-xs-7 pull-left disp_table_cell">
                        {{day.holiday_name}}
                    </p>
                    <p class="col-xs-5 pull-right align_right disp_table_cell" v-if="!day.is_closed">
                        {{day.open_time | moment("h a", timezone)}} - {{day.close_time | moment("h a", timezone)}}
                    </p>
                    <p class="col-xs-5 pull-right align_right disp_table_cell" v-else>
                        {{$t("message.closed")}}
                    </p>
                </div>
            </div>
            <div class="row" v-else>
                {{$t("message.noHoursMessage")}}
            </div>
        </div>
    </div>
</template>

<script>
define(["Vue", "jquery", "Raphael", "mm_mapsvg","mousewheel", "moment", "moment-timezone", "vue-moment","vue!svg-map"], function(Vue,$,Raphael, mapsvg,mousewheel,moment,tz, VueMoment,SVGMapComponent) {
    return Vue.component("store-details-component", {
        template: template, // the variable template will be injected,
        data: function() {
            return {
                currentStore : null,
                map : null,
                all_hours : {},
                show_promo : false,
                show_hours : false,
                all_promos : [],
                loading : true
            }
        },
        beforeRouteEnter (to, from, next) {
            
            next(vm => {
                //location.reload();// vm.$forceUpdate(SVGMapComponent);
                console.log("force updated in vm");
                // access to component instance via `vm`
                vm.currentStore = vm.findStoreBySlug(to.params.id);
                this.currentStore = vm.currentStore;
                if (vm.currentStore === null || vm.currentStore === undefined){
                    vm.$router.replace({ name: '404'});
                }
                // Vue.component(SVGMapComponent, {props: {svgMapUrl:this.getSVGurl }});
            })
        },
        beforeRouteUpdate (to, from, next) {
            this.$forceUpdate();
            console.log("force updated in this");
            this.currentStore = this.findStoreBySlug(to.params.id);
            if (this.currentStore === null || this.currentStore === undefined){
                this.$router.replace({ name: '404'});
            }
        },
        created () {
            // console.log(this.showLoader);
            this.$emit('loadChange');
            console.log("emit to parent to make this true");
            
            window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
       
        },
        mounted : function (){
          
        },
        watch: {
            currentStore : function () {
                this.all_hours = this.state.results.hours; 
                var store_promo = _.groupBy(this.promotions(), 'id');
                var temp_promo=[];
                _.forEach(this.currentStore.promotions, function(val, key) {
                    var promo =store_promo[val];
                    temp_promo.push(promo[0]);
                });
                this.all_promos = temp_promo;
                console.log(this.all_promos);
                var ref = this.svgMapRef;
                
                _.delay(function(val) {
                    ref.addMarker(val,'//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png');
                    ref.setViewBox(val);
                }, 4000, this.currentStore);
            },
            all_hours : function () {
                var store_hours = _.groupBy(this.all_hours, 'id');
                if(this.currentStore.todays_hour!== null){
                    Vue.set(this.currentStore,'store_hours_today', store_hours[this.currentStore.todays_hour][0]);
                }
                else {
                    Vue.set(this.currentStore,'store_hours_today',"");
                }   
                
                var temp_hours=[];
                if(this.currentStore.store_hours.length > 0) {
                    _.forEach(this.currentStore.store_hours, function(val, key) {
                        var hours =store_hours[val];
                        temp_hours.push(hours[0]);
                    });
                }
                else {
                    temp_hours.push(null);
                }
                Vue.set(this.currentStore,'store_hours_data', temp_hours);
                console.log(this.currentStore);
            },
            map : function () {
                this.loading = false;
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
            },
            svgMapRef() {
                return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
            }
        }, 
        methods : {
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
                return day;
            },
            go_back () {
               this.$router.back();
            },
            updateSVGMap (map) {
                this.map = map;
            }
        }
    });
});
</script>
