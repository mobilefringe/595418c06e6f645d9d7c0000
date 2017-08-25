<template>
    <div>
        <div class="position_relative map_search_page">
            <div class="gray_bar">
                <div class="col-xs-10">
                    <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect1" class="search1" placeholder="Search Stores" v-model="swapSearch ? search2 : search1">
                        <template slot="item" scope="option">
                            <article class="media ">
                                <p>
                                    <strong>{{ option.data.name }} @ {{option.data.property}}</strong>
                                </p>
                            </article>
                        </template>
                    </search-component>
                    <search-component :list="allStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect2" class="search2" placeholder="Find a store near you" v-model="swapSearch ? search1 : search2">
                        <template slot="item" scope="option">
                            <article class="media ">
                                <p>
                                    <strong>{{ option.data.name }} @ {{option.data.property}}</strong>
                                </p>
                            </article>
                        </template>
                    </search-component>
                </div>
                <img @click="swapSearchTerm" src="//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1498848398000/Arrows Icon.png" class="search_icon" alt="">
            </div>
            <div class="map">
                <!--<div class="demo_1 map3" style="" id="mapsvg"></div>-->
                <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl"></svg-map>
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
                    <p class="dets_data">{{store1.property}}</p>
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
                    <p class="dets_data">{{store2.property}}</p>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "jquery", "Raphael", "mm_mapsvg","mousewheel","vue!search-component","vue!svg-map"], function(Vue, $, Raphael, mapSvg,mousewheel,SearchComponent,SVGMapComponent) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                lift_blue_box: false,
                store1: null,
                store2: null,
                map :{},
                suggestionAttribute: 'name',
                search1 : "",
                search2 : "",
                swapSearch : false
            }
        },
        created (){
          window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
        },
        watch: {
            store1 : function () {
                this.svgMapRef.addMarker(this.store1,'//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1500567644000/map_pin_1x.png');
            },
            store2 : function () {
                this.svgMapRef.addMarker(this.store2,'//codecloud.cdn.speedyrails.net/sites/595418c06e6f645d9d7c0000/image/png/1501693321000/map_pin_green_1x.png');
            }
        },
        computed: {
            property (){
                return this.$store.getters.getProperty;
            },
            getSVGurl () {
                return "https://www.mallmaverick.com" + this.property.svgmap_url;
            },
            findStoreBySlug (){
                return this.$store.getters.findStoreBySlug;
            },
            allStores() {
                return this.$store.getters.processedStores;
            },
            svgMapRef() {
                return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
            }
        },
         methods: {
            swapSearchTerm: function () {
                this.swapSearch = !this.swapSearch;
                this.svgMapRef.hideMarkers();
                var temp_store1 = this.store1;
                this.store1 = this.store2;
                this.store2 = temp_store1;
            },
            removeSearch1 :function() {
                this.svgMapRef.removeMark (this.store1.id);
                this.search1 = "";
                this.store1 = null;
            },
            removeSearch2 :function() {
                this.svgMapRef.removeMark (this.store2.id);
                this.search2 = "";
                this.store2 = null;
            },
            onOptionSelect1(option) {
                this.store1 = option;
            },
            onOptionSelect2(option) {
                this.store2 = option;
            },
            removeDuplicates(myArr, prop) {
                return myArr.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
                });
            },
            updateSVGMap (map) {
                this.map = map;
            }
        }
    })
  })
</script>