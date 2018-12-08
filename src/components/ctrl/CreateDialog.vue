<template>
<DialogContainer v-bind:show="show">
  adsf
</DialogContainer>
</template>

<script>
import DialogContainer, { DialogEventBus } from './DialogContainer';

export default {
  name: 'CreateDialog',
  components: { DialogContainer, DialogEventBus },
  beforeCreate() {
    DialogEventBus.$on('show-create-dialog', () => {
      DialogEventBus.$emit('show', this.$el);
    });
  },
  beforeDestroy() {
    DialogEventBus.$off('show-create-dialog');
  },
  data() {
    return {
      show: false
    };
  }
}
</script>

<style scoped>

</style>
