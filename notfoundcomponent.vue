<template>
  <div class="row">
    <div class="large-6 columns">
      <h1>{{text}}</h1>
      <img src="/codecloud.cdn.speedyrails.net/sites/5890c5296e6f640dd9000000/image/png/1463595344000/404_error_msg-1.png">
    </div>
  </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("not-found-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {"text": "Custom 404 Page"};
      }
    });
  });
</script>
