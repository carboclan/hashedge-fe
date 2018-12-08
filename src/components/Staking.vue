<template>
<div>
  <div class="title">Staking</div>
  <TokenTable title="Proposals"></TokenTable>
  <CreateDialog></CreateDialog>
</div>
</template>

<script>
import TokenTable from './ctrl/TokenTable';
import CreateDialog from './ctrl/CreateDialog';

export default {
  name: 'Staking',
  components: {TokenTable, CreateDialog}
}
</script>

<style scoped>

</style>
