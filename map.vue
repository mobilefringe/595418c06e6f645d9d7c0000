<template>
    <div>
        <div class="position_relative map_search_page">
            <div class="gray_bar">
                <div class="col-xs-10">
                    <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect1" class="search1" placeholder="Search Stores">
                        <template slot="item" scope="option">
                            <article class="media ">
                                <p>
                                    <strong>{{ option.data.name }} @ {{option.data.property_id}}</strong>
                                </p>
                            </article>
                        </template>
                    </search-component>
                    <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect2" class="search2" placeholder="Find a store near you">
                        <template slot="item" scope="option">
                            <article class="media ">
                                <p>
                                    <strong>{{ option.data.name }} @ {{option.data.property_id}}</strong>
                                </p>
                            </article>
                        </template>
                    </search-component>
                </div>
                <img @click="swapSearchTerm" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1498848398000/Arrows Icon.png" class="search_icon" alt="">
            </div>
            <div class="map">
                <div class="demo_1 map3" style="" id="mapsvg"></div>
                <div v-if = "store1" class="blue_dets_box">
                    <div class="close_dets pull-left">
                        <img @click="removeSearch1" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                    </div>
                    <div class="more_dets pull-right">
                        <router-link :to="'stores/' +store1.slug">
                            <img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt="">
                        </router-link>
                    </div>
                    <p class="dets_title">{{store1.name}} </p>
                    <p class="dets_data">{{store1.property_id}}</p>
                </div>
                <div  v-if = "store2" class="green_dets_box">
                    <div class="close_dets pull-left">
                        <img @click="removeSearch2" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180586000/Close_button.png" class="" alt="">
                    </div>
                    <div class="more_dets pull-right">
                        <router-link :to="'stores/' +store2.path_url">
                            <img src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1499180555000/Right Arrow.png" class="" alt="">
                        </router-link>
                    </div>
                    <p class="dets_title">{{store2.name}}</p>
                    <p class="dets_data">{{store2.property_id}}</p>
                    
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery", "mm_mapsvg","mousewheel","raphael","vue!search-component"], function(Vue, $,mapsvg,mousewheel,raphael,SearchComponent) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                // mobile_search_store : "",
                // mobile_find_store: "",
                lift_blue_box: false,
                store1: null,
                store2: null,
                map :{},
                suggestionAttribute: 'name'
            }
        },
        mounted: function (){
            var map = $('#mapsvg').mapSvg({
                source: this.getSVGurl,    // Path to SVG map
                colors: {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"},
                // viewBox: [3000,0,6000,6000],
                // disableAll: true,
                height:1000,
                width:1300,
                // regions:regions,
                tooltipsMode:'custom',
                loadingText: "loading...",
                zoom: true,
                zoomButtons: {'show': true,'location': 'left' },
                pan:true,
                cursor:'pointer',
                responsive:true,
                zoomLimit: [0,10]
            });
            this.map = map;
            console.log(this.store1);
            // $(".search1 input").attr("placeholder", "Search Stores");
            // $(".search2 input").attr("placeholder", "Find a store near you");
        },
        watch: {
            store1 : function () {
                
                // this.mobile_search_store = this.store1.name;
                // $(".search1 input").val(this.mobile_search_store);
                // console.log("changed store1",this.mobile_search_store);
                var val = this.store1;
                var map= this.map;
                if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        var coords = map.get_coords(val.svgmap_region);
                        var height = parseInt(coords["height"])
                        var width = parseInt(coords["width"])
                        var x_offset = (parseInt(width) / 2);
                        var y_offset = (parseInt(height) /2);
                        
                        map.setMarks([{ xy: [coords["x"]    + x_offset-15, coords["y"]  + y_offset-20],
                            attrs: {
                                src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png', // image for marker
                                href: '/stores/'+val.slug
                            },
                            tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
                        }]);
                        // console.log(val.slug, val.svgmap_region);
                        //  map.selectRegion(val.svgmap_region);
                    }
            },
            store2 : function () {
                
                // this.mobile_find_store = this.store2.name;
                // $(".search2 input").val(this.mobile_find_store);
                // console.log("changed store2",this.mobile_find_store);
                var val = this.store2;
                var map= this.map;
                if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                        var coords = map.get_coords(val.svgmap_region);
                        var height = parseInt(coords["height"])
                        var width = parseInt(coords["width"])
                        var x_offset = (parseInt(width) / 2);
                        var y_offset = (parseInt(height) /2);
                        
                        map.setMarks([{ xy: [coords["x"]    + x_offset-15, coords["y"]  + y_offset-20],
                            attrs: {
                                src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501693321000/map_pin_green_1x.png', // image for marker
                                href: '/stores/'+val.slug
                            },
                            tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
                        }]);
                        // console.log(val.slug, val.svgmap_region);
                        //  map.selectRegion(val.svgmap_region);
                    }
            }
        },
        computed: {
            property(){
                return this.$store.getters.getProperty;
            },
            getSVGurl : function () {
                return "https://www.mallmaverick.com" + this.property.svgmap_url;
            },
            showStore1Details: function() {
                this.store1 =  this.findStoreBySlug("tdcentre-starbucks-coffee--2");
                this.store1.path_url = "stores/" + this.store1.slug;
            },
            showStore2Details: function() {
                this.store2 = this.findStoreBySlug("eatoncentrepath-nino-d-arena");
                 this.store2.path_url = "stores/" + this.store2.slug;
            },
            findStoreBySlug (){
                return this.$store.getters.findStoreBySlug;
            },
            // processedStores() {
            //     // $(".options-list").addClass("scrollable-menu");
            //     return this.removeDuplicates(this.allStores, 'name');
            // },
            allStores() {
                return this.$store.getters.processedStores;
            }
        },
         methods: {
            swapSearchTerm: function () {
                this.map.marksHide();
                var temp_store1 = this.store1;
                this.store1 = this.store2;
                this.store2 = temp_store1;
                // var temp_search1 = this.mobile_search_store;
                // this.mobile_search_store = this.mobile_find_store;
                // this.mobile_find_store = temp_search1;
                $(".search1 input").val(this.store1.name);
                $(".search2 input").val(this.store2.name);
                console.log($(".search1 input").val());
                console.log($(".search2 input").val());
                // console.log("swap?",this.mobile_search_store , this.mobile_find_store);
            },
            removeSearch1 :function() {
                this.mobile_search_store = '';
            },
            removeSearch2 :function() {
                this.mobile_find_store = '';
            },
            onOptionSelect1(option) {
                console.log('Selected option:', option);
                // var counted_stores = _.countBy(this.allStores,'name');
                this.store1 = option;
                // console.log($(".search1 input").val());
                // console.log($(".search2 input").val());
                
                
                    
            },
            onOptionSelect2(option) {
                console.log('Selected option:', option);
                // var counted_stores = _.countBy(this.allStores,'name');
                this.store2 = option;
                // console.log($(".search1 input").val());
                // console.log($(".search2 input").val());
                // this.mobile_find_store = option.name;
                console.log(this.map);
                // var val = option;
                // var map= this.map;
                // if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                //         var coords = map.get_coords(val.svgmap_region);
                //         var height = parseInt(coords["height"])
                //         var width = parseInt(coords["width"])
                //         var x_offset = (parseInt(width) / 2);
                //         var y_offset = (parseInt(height) /2);
                        
                //         map.setMarks([{ xy: [coords["x"]    + x_offset-15, coords["y"]  + y_offset-20],
                //             attrs: {
                //                 src: '//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501693321000/map_pin_green_1x.png', // image for marker
                //                 href: '/stores/'+val.slug
                //             },
                //             tooltip : "<p class='tooltip_name'>"+val.name+" @ " + val.property_id +"</p>"
                //         }]);
                //         // console.log(val.slug, val.svgmap_region);
                //         //  map.selectRegion(val.svgmap_region);
                //     }
            },
            removeDuplicates(myArr, prop) {
                return myArr.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
                });
            }
        }
    })
  })
</script>