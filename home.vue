<template>
    <div class="home_page">
        <div class="gray_bar">
            <div id="mobile_search"  class="col-xs-10">
                <search-component :list="processedStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect" placeholder="Search All Path Stores" v-model="search">
                    <template slot="item" scope="option">
                        <article class="media">
                            <p>
                                <strong>{{ option.data.name }}</strong>
                            </p>
                        </article>
                    </template>
                </search-component>
            </div>
            <img src="//codecloud.cdn.speedyrails.net/sites/59515e256e6f646e860c0000/image/png/1498575328000/Search Icon.png" class="search_icon" alt="" @click="onOptionSelect"/>
        </div>
        
        <h4 class="all_caps home_title"> {{$t("message.discoverPath")}}</h4>
        <div class="menu_btn_holder" >
            <router-link tag="li" to="/location" active-class="active" class=" menu_btn" exact>
                <a class=" menu_btn_label">{{$t("menu.yourLocation")}}</a>
            </router-link>
            <router-link tag="li" to="/stores" active-class="active" class=" menu_btn" exact>
                <a class=" menu_btn_label">{{$t("menu.stores")}}</a>
            </router-link>
            <router-link tag="li" to="/promotions" active-class="active" class=" menu_btn" exact>
                <a class=" menu_btn_label">{{$t("menu.promotions")}}</a>
            </router-link>
             <router-link tag="li" to="/map" active-class="active" class=" menu_btn" exact>
                <a class=" menu_btn_label">{{$t("menu.pathMap")}}</a>
            </router-link>
        </div>
        <!-- Backdrop-->
        <!--<div v-show="loading" class="modal-backdrop custom_backdrop"><div class="loader">Loading...</div></div>-->
    </div>
</template>

<script>
  define(["Vue","vue!search-component"], function(Vue,SearchComponent) {
    return Vue.component("home-component", {
        // props: ['menu_items'],
        template: template, // the variable template will be injected
         props: {
            menu_items: type: Array
                
         }.
        data: function() {
            return {
                mobile_search_box : "",
                suggestionAttribute: 'name',
                loading : true,
                search : ""
            }
        },
        computed: {
            property(){
                return this.$store.getters.getProperty;
            },
            processedStores() {
                console.log(this.menu_items);
                return this.removeDuplicates(this.allStores, 'name');
            },
            allStores() {
                return this.$store.getters.processedStores;
            }
        },
        methods : {
            onOptionSelect(option) {
                console.log('Selected option:', option);
                var counted_stores = _.countBy(this.allStores,'name');
                console.log($(".input").val());
                if(option.type==="click") {
                    console.log($(".input").val());
                }
                else {
                    if( counted_stores[option.name] >1) {
                        var route = '/map/' + option.name;
                        console.log(route);
                        this.$router.push(route);
                    }
                    else {
                        var route = '/stores/' + option.slug;
                        console.log(route);
                        this.$router.push(route);
                    }
                }
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
