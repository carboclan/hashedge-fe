<template>
<div>
  <div class="title">Staking</div>
  <TokenTable title="Proposals" v-bind:data="proposals"></TokenTable>
  <CreateDialog></CreateDialog>
</div>
</template>

<script>
import { web3, listExchanges } from '../web3';
import TokenTable from './ctrl/TokenTable';
import CreateDialog from './ctrl/CreateDialog';

export default {
  name: 'Staking',
  components: { TokenTable, CreateDialog },
  methods: {
    async reload() {
      this.$data.proposals = await listExchanges();
    }
  },
  mounted() {
    this.reload();
  },
  data() {
    return {
      proposals: []
    };
  }
}
</script>

<style scoped>

</style>
