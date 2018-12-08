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
      <tr class="token" v-for="token of tokens" v-bind:class="token.hashType">
        <td>
          <div><span class="hashtype">{{token.hashType}}</span></div>
          <div>{{token.name}}</div>
        </td>
        <td class="desc">30days</td>
        <td>
          <div class="progress">
            <div v-bind:style="{ width: Math.min(token.totalSupply / token.target * 100, 105) + '%' }"></div>
          </div>
          <div class="desc">{{token.totalSupply}}/{{token.target}} staked</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { DialogEventBus } from './DialogContainer';

Vue.filter('formatDate', function(value, format) {
  format = format || 'MM/DD/YYYY';

  if (value) {
    return moment(String(value)).forma(format);
  }
});

export default {
  name: 'TokenTable',
  props: ['title'],
  methods: {
    showCreatDialog() {
      DialogEventBus.$emit('show-create-dialog');
    }
  },
  data() {
    return {
      tokens: [
        { name: 'BTC • Dec • 07.12.2018', hashType: 'POW', totalSupply: 3.7, target: 4, startTs: new Date(), endTs: Date.now() + 3600 * 1000 * 24 * 30  },
        { name: 'ETH • Jan • 07.12.2018', hashType: 'POW', totalSupply: 2.7, target: 4, startTs: new Date(), endTs: Date.now() + 3600 * 1000 * 24 * 30  },
        { name: 'FLC • Feb • 07.12.2018', hashType: 'POST', totalSupply: 6, target: 6, startTs: new Date(), endTs: Date.now() + 3600 * 1000 * 24 * 30  },
        { name: 'EOS • Mar • 07.12.2018', hashType: 'DPOS', totalSupply: 3.3, target: 4, startTs: new Date(), endTs: Date.now() + 3600 * 1000 * 24 * 30  },
        { name: 'NAV • Apr • 07.12.2018', hashType: 'POS', totalSupply: 4.5, target: 4, startTs: new Date(), endTs: Date.now() + 3600 * 1000 * 24 * 30  }
      ]
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
