<template>
    <div>
    test
    </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("map-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
            title: "The Path!",
            description: "Using new SDK",
            mobile_search_box : "",
            svg_map_url: ""
        }
      },
      computed: {
        property(){
          return this.$store.getters.getProperty;
        },
        getSVGurl : function () {
            return property.svgmap_url;
        }
      }
    })
  })
</script>