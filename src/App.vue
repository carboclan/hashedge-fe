<template>
  <div id="app">
    <div class="nav">
      <div class="brand">Hashedge</div>
      <ul class="nav-list">
        <li class="active">
          <a>
            <i class="material-icons">insert_drive_file</i>
            Staking
          </a>
        </li>
        <li>
          <a>
            <i class="material-icons">group_work</i>
            Trading
          </a>
        </li>
        <li class="sep"></li>
        <li>
          <a>
            <i class="material-icons">person</i>
            My Portfolio
          </a>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  background-color: #364851;
  margin: 0;
  padding: 0;
  vertical-align: middle;
}
</style>

<style scoped lang="scss">
#app {
  font-family: 'Roboto Condensed', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav {
  margin: 56px 84px;
  width: 221px;
  height: 189px;

  .brand {
    height: 48px;
    line-height: 48px;

    font-family: Eczar;
    font-size: 32px;
    letter-spacing: 0.06em;

    color: #ECEFF1;
  }

  .nav-list {
    list-style: none;
    margin: 21px 0 0 0;
    padding: 0;

    li {
      margin-bottom: 8px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      color: #90A4AE;

      a {
        display: flex;

        > * {
          align-self: center;
          vertical-align: center;
        }
      }

      .material-icons {
        padding: 8px;
        font-size: 16px;
        color: #90A4AE;
      }

      &.active {
        color: #ECEFF1;
        background-color: #263238;
        border-radius: 4px;

        .material-icons {
          color: #ECEFF1;
        }
      }

      &.sep {
        height: 0;
        border-top: 1px solid #546E7A;
      }
    }
  }
}
</style>
