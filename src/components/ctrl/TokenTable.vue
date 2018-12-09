<template>
<div class="table-container">
  <table>
    <thead>
      <tr class="toolbar">
        <th>{{title}}</th>
        <th colspan="3">
          <button v-on:click="showCreatDialog()">ISSUE NEW</button>
        </th>
      </tr>
      <tr class="header">
        <th>CONTRACT TITLE</th><th>MATURITY</th><TH>OPEN INTEREST STAKED</TH>
      </tr>
    </thead>
    <tbody>
      <tr class="token" v-for="token of data" v-bind:class="token.hashType">
        <td>
          <div><span class="hashtype">{{token.hashType}}</span></div>
          <div>{{token.name}}</div>
          <div class="desc">{{token.tokenSize | bn}} {{token.hashRateUnit}}</div>
        </td>
        <td class="desc">30days</td>
        <td>
          <div class="progress" v-on:click="showTradeDialog(token)">
            <div v-bind:style="{ width: Math.min(token.totalSupply / token.target * 100, 105) + '%' }"></div>
          </div>
          <div class="desc" v-on:click="showTradeDialog(token)">{{token.totalSupply | eth}} / {{token.target | eth}} staked</div>
        </td>
      </tr>
    </tbody>
  </table>
  <trade-dialog></trade-dialog>
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { web3 } from '../../web3';
import { DialogEventBus } from './DialogContainer';
import TradeDialog from './TradeDialog';

Vue.filter('formatDate', function(value, format) {
  format = format || 'MM/DD/YYYY';

  if (value) {
    return moment(String(value)).forma(format);
  }
});

Vue.filter('eth', function (value, opt) {
  opt = opt || {};
  return (!opt.hideEth && 'Ξ ' || '') + web3.fromWei(value).toNumber().toFixed(opt.decimals || 5);
});

Vue.filter('bn', function (value) {
  return value.toNumber();
});

export default {
  name: 'TokenTable',
  props: ['title', 'data'],
  components: { TradeDialog },
  methods: {
    showCreatDialog() {
      DialogEventBus.$emit('show-create-dialog');
    },
    showTradeDialog(token) {
      DialogEventBus.$emit('show-trade-dialog', token);
    }
  },
  data() {
    return {
      tokens: []
    };
  }
}
</script>

<style scoped lang="scss">
.table-container {
  background-color: #2a373e;
  border-radius: 4px;
  color: #ECEFF1;

  table {
    width: 100%;

    th {
      text-align: left;
      padding-left: 16px;
    }

    tr.toolbar {
      height: 64px;

      th:first-child {
        font-size: 20px;
      }

      th:last-child {
        text-align: right;
        padding-right: 16px;
        button {
          font-size: 14px;
          color: #90A4AE;
          background: transparent;
          border: none;
        }
      }
    }

    tr.header {
      th {
        color: #90A4AE;
        font-size: 10px;
      }
    }

    .desc {
      color: #90A4AE;
      font-size: 12px;
    }

    tr.token {
      td {
        border-top: 1px solid #151B1F;
        text-align: left;
        padding: 16px;

        > div {
          margin-bottom: 7px;
        }

        > div:last-child {
          margin-bottom: 0;
        }

        .hashtype {
          padding: 0 3px;
          border: 1px solid transparent;
          border-radius: 4px;
          font-size: 10px;
        }

        .progress {
          width: 270px;
          height: 2px;
          background-color: #151B1F;
          border-radius: 1px;
          margin-bottom: 11px;

          > div {
            height: 2px;
          }
        }
      }

      &.POW {
        .hashtype {
          border-color: #F44336;
          color: #F44336;
        }

        .progress > div {
          background-color: #F44336;
        }
      }

      &.POS {
        .hashtype {
          border-color: #FF9800;
          color: #FF9800;
        }

        .progress > div {
          background-color: #FF9800;
        }
      }

      &.DPOS {
        .hashtype {
          border-color: #4CAF50;
          color: #4CAF50;
        }

        .progress > div {
          background-color: #4CAF50;
        }
      }

      &.POST {
        .hashtype {
          border-color: #FFEB3B;
          color: #FFEB3B;
        }

        .progress > div {
          background-color: #FFEB3B;
        }
      }
    }
  }
}
</style>
