<template>
  <el-container>
    <el-header>
      <div class="header-logo">
        <img src="./assets/logo.png" alt="logo" />
        <div>Orbiter's Dashboard</div>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <ul class="aside-menu">
          <li
            v-for="(item, index) in menus"
            :key="index"
            :class="{ 'is-active': item.name == menuActive }"
            @click="onClickMenu(item.name)"
          >
            {{ item.name }}
            <div>ddddd</div>
            <div>ddddd</div>
            <div>ddddd</div>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      menuActive: '',
    })

    const menus = [
      {
        name: 'Dashboard',
        link: '',
      },
      {
        name: 'Compare',
        link: '',
      },
      {
        name: 'Graph',
        link: '',
      },
    ]

    const onClickMenu = (menuName: string) => {
      state.menuActive = menuName
    }

    return {
      ...toRefs(state),

      menus,
      onClickMenu,
    }
  },
})
</script>

<style lang="scss">
$header-height: 60px;
$aside-width: 200px;

.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: white;
  border-bottom: 1px solid #{var(--el-border-color-base)};
  z-index: 99999;

  .header-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: center;
    margin: 12px 0;
    font-size: 22px;
    font-weight: bold;

    img {
      width: 40px;
      margin-right: 12px;
    }
  }
}

.el-aside {
  position: fixed;
  top: $header-height;
  bottom: 0;
  width: $aside-width !important;
  background: white;
  border-right: 1px solid #{var(--el-border-color-base)};
  box-sizing: border-box;

  .aside-menu {
    list-style: none;
    margin: 0;
    padding: 0 16px;

    li {
      margin: 20px 0;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: #{var(--el-transition-all)};

      &.is-active,
      &:hover {
        background: #f8f8f8;
      }

      &.is-active {
        box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.1);
      }
    }
  }
}

.el-main {
  margin-top: $header-height;
  margin-left: $aside-width;
}
</style>
