<template>
<div>
  <div class="title">Staking</div>
  <TokenTable title="Proposals"></TokenTable>
</div>
</template>

<script>
import TokenTable from './ctrl/TokenTable';

export default {
  name: 'Staking',
  components: {TokenTable}
}
</script>

<style scoped>

</style>
