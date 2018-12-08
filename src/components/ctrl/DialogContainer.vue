<template>
<div class="dialog-mask" v-bind:class="extraClass" v-bind:style="{ display: show ? 'block' : 'none' }" v-on:click="hide">
  <div class="dialog-container">
    <!--<slot></slot>-->
  </div>
</div>
</template>

<script>
import Vue from 'vue';
export const DialogEventBus = new Vue();

export default {
  props: ['extraClass'],
  name: 'DialogContainer',
  beforeCreate() {
    DialogEventBus.$on('show', (el) => {
      if (this.$el.isSameNode(el)) {
        this.$data.show = true;
      }
    });
  },
  beforeDestroy() {
    DialogEventBus.$off('show');
  },
  methods: {
    hide() {
      this.$data.show = false;
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
