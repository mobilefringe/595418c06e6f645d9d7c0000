<template>
    <div>
        <div class="map_page">
            <div class="map">
            
                <div class="demo_1 map3" style="" id="mapsvg">       
                
                    <img alt="map_image" id="map_image" :src="getSVGurl"> 
                    
                    <div v-for = "store in all_stores">
                        <div class="marker" :id="concatVal('store_',store.id)" :data-coords="concatCood(store.x_coordinate, store.y_coordinate)">
                            <a style="color:#fff" :href="concatVal('/stores/',store.slug)">  {{store.name}}  </a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "jquery", "mapsvg","mousewheel","craftmap"], function(Vue, $,mapsvg,mousewheel,craftmap) {
    return Vue.component("map-component", {
        template: template, // the variable template will be injected
        data: function() {
            return {
                all_stores: {}
            }
        },
        created: function () {
            this.getStoresByName();
        },
        watch: {
           
        },
        computed: {
            property(){
                return this.$store.getters.getProperty;
            },
            getSVGurl : function () {
                return "https://www.mallmaverick.com" + this.property.svgmap_url;
            },
            storesByAlphaIndex() {
                return this.$store.getters.storesByAlphaIndex;
            },
            storesByCategoryName() {
                return this.$store.getters.storesByCategoryName;
            },
            findStoreBySlug (){
                return this.$store.getters.findStoreBySlug;
            }
        },
         methods: {
            getStoresByName() {
               
                var slug = this.$route.params.id;
                var first_letter = slug[0].toUpperCase();
                var stores = this.storesByAlphaIndex[first_letter];
                // console.log(stores,slug);
                // this.dine_stores = _.orderBy(temp_dine_array, 'name');
                this.all_stores = _.groupBy(stores, 'name')[slug];
                
                
                // $.each(this.all_stores, function(i, val){
                //     x = val.x_coordinate - 19;
                //     y = val.y_coordinate - 58;
                //     // val.coordinate = val.x_coordinate + "," +val.y_coordinate;
                //       $('#map_image').after('<div class="marker" id="store_' + val.id  + '" data-coords="' + x + ', ' + y + '"><a style="color:#fff" href=/stores/'+val.slug +'>' + val.name + '</a></div>');
                //   console.log(x,y);
                // });
                $('#mapsvg').craftmap({
                    image:{
                        width:500,
                        height:400
                    },
                    map: {
                        position: 'center'
                    }
                });
                console.log(this.all_stores);
            },
            concatVal(val,key) {
                return val+""+key;
            },
            concatCood(val,key) {
                return val+","+key;
            }
        }
    })
  })
</script>

<style>
    .marker {
        background: url("//kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/7760d28d65f477cd66bd4756f9204c15/map_pin2.png") no-repeat;
        background-size:contain;
        cursor: pointer;
        display: block;
        height: 35px;
        margin-top: 5px;
        outline: medium none;
        text-indent: -9999px;
        width: 25px;
    }
</style>