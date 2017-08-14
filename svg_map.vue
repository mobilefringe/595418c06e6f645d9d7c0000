<template>
    <div class="svg-map" >
        <div class="map">
            <div class="demo_1 map3" id="mapsvg" @setMarker="addMarker" ></div>
        </div>
    </div>
</template>

<script>
    define(["Vue"], function(Vue) {
        return Vue.component('svg-map', {
            template: template,
            props: {
                svgMapUrl: {
                    type: String,
                    required: true
                },
                colours:{
                    type: Object,
                    default: this.getColour
                },
                viewBox : {
                    type : Array,
                    default: this.getEmptyArray //viewBox: [3000,0,6000,6000],
                },
                disableAll: {
                    type: Boolean,
                    default: false
                },
                height: {
                    type: Number,
                    default: 1000
                },
                width:{
                    type: Number,
                    default: 1300
                },
                regions: {
                    type: Array,
                    default: this.getEmptyArray
                },
                loadingText: {
                    type: String,
                    default: "loading..."
                },
                zoom: {
                    type: Boolean,
                    default: true
                },
                zoomButtons: {
                    type: Object,
                    default: this.getZoomBtn
                },
                pan: {
                    type: Boolean,
                    default: true
                },
                cursor: {
                    type: String,
                    default: 'pointer'
                },
                responsive: {
                    type: Boolean,
                    default: true
                },
                zoomLimit: {
                    type: Array,
                    default: this.getZoomLimit
                }
            },
            data() {
                return {
                    isOpen: false,
                    map: null
                }
            },
            watch : {
                map : function () {
                    console.log("emit change in map",  this.map);
                    this.$emit('updateMap', this.map);  
                }
            },
            mounted () {
                this.map = $('#mapsvg').mapSvg({
                    source: this.svgMapUrl,//this.getSVGurl,    // Path to SVG map
                    colors: this.colours,
                    viewBox: this.viewBox,
                    disableAll: this.disableAll,
                    height:this.height,
                    width:this.width,
                    regions:this.regions,
                    tooltipsMode:'custom',
                    loadingText: this.loadingText,
                    zoom: this,
                    zoomButtons: this.zoomButtons,
                    pan:this.pan,
                    cursor:this.cursor,
                    responsive:this.responsive,
                    zoomLimit:this.zoomLimit
                });
                Vue.nextTick(function () {
                  // DOM updated
                  //=map;
                  console.log("svg" ,this.map);
                })
                
                
            },
            methods : {
                getColour() {
                    return {stroke: '#aaaaaa', selected: "#CC00CC", hover: "#CC00CC"} ;
                },
                getEmptyArray () {
                    return [];
                },
                getZoomBtn () {
                    return {'show': true,'location': 'left' };
                },
                getZoomLimit () {
                    return [0,10];
                },
                addMarker (region) {
                    console.log("HELLOOOOOO", region);
                }
            }
        });
    });
</script>