<template>
<DialogContainer v-bind:show="show" extra-class="create-dialog">
  <div class="header">
    Issue an Options Contract
  </div>
  <div class="sep"></div>
  <div class="params">
    <input type="text" placeholder="Token Name" v-model="name">
    <input type="text" placeholder="Token Symbol" v-model="symbol">
    <select v-model="hashType">
      <option value="POW">POW</option>
      <option value="POS">POS</option>
      <option value="DPOS">DPOS</option>
      <option value="POST">POST</option>
    </select>
    <select v-model="currencyType">
      <option value="ETH" v-if="hashType === 'POW'">ETH</option>
      <option value="BTC" v-if="hashType === 'POW'">BTC</option>
      <option value="EOS" v-if="hashType === 'DPOS'">EOS</option>
      <option value="NAV" v-if="hashType === 'POS'">NAV</option>
      <option value="FLC" v-if="hashType === 'POST'">FLC</option>
    </select>
    <select v-model="tokenSize">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
    <select v-model="hashUnit">
      <option value="TH/s">TH/s</option>
      <option value="MH/s">MH/s</option>
    </select>
    <input type="number" placeholder="Strike Price" v-model="strikePrice">
    <select v-model="duration">
      <option value="7">Weekly</option>
      <option value="15">BiWeekly</option>
      <option value="30">Monthly</option>
      <option value="90">Quarterly</option>
    </select>
    <input type="number" placeholder="Total Supply" v-model="totalSupply">
    <input type="number" placeholder="Target Liquidity" v-model="target">
  </div>
  <div class="sep"></div>
  <div class="footer">
    <button v-on:click="hide">CANCEL</button>
    <button v-on:click="submit" class="primary">SUBMIT</button>
  </div>
</DialogContainer>
</template>

<script>
import { web3, hashedgeFactory } from '../../web3';
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
  methods: {
    hide() {
      DialogEventBus.$emit('hide', this.$el);
    },
    async submit() {
      const { name, symbol, hashType, currencyType, tokenSize, hashUnit, strikePrice, duration, totalSupply, target } = this.$data;
      const recpt = await hashedgeFactory.createExchange(
        web3.toWei(target, 'ether'), name, symbol,
        totalSupply, hashType, currencyType, hashUnit, tokenSize,
        Date.now() / 1000 + 24 * 3600, Date.now() / 1000 + 24 * 3600 * (duration + 1), web3.toWei(strikePrice, 'ether')
      );

      await web3.eth.getTransactionReceipt(recpt);
      alert('success');
      DialogEventBus.$emit('hide', this.$el);
    }
  },
  data() {
    return {
      name: null,
      symbol: null,
      show: false,
      hashType: 'POW',
      currencyType: 'BTC',
      tokenSize: 1,
      hashUnit: 'TH/s',
      strikePrice: null,
      duration: 30,
      totalSupply: null,
      target: null
    };
  }
}
</script>

<style lang="scss">
.create-dialog {
  .dialog-container {
    width: 432px;
    background-color: #37474F;
  }

  .header {
    background-color: #263238;
    padding: 16px;
    height: 29px;
    line-height: 29px;
    font-size: 20px;
    letter-spacing: 0.06em;
    color: #ECEFF1;
  }

  .params {
    display: flex;
    flex-wrap: wrap;

    > * {
      flex: 1 1 auto;
      margin: 8px;
      border: none;
      min-width: 180px;

      height: 32px;
      line-height: 32px;
      font-size: 16px;
      letter-spacing: 0.06em;

      background-color: transparent;
      color: #90A4AE;
      padding: 4px 8px;
    }
  }

  .footer {
    text-align: right;
    background-color: #263238;

    button {
      border: none;
      background-color: transparent;
      margin-right: 16px;
      width: 67px;
      height: 39px;
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.06em;

      color: #90A4AE;

      &.primary {
        color: #ECEFF1;
      }
    }
  }
}
</style>
