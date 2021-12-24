<template>
  <el-container>
    <el-header>
      <div class="header-logo">
        <img src="./assets/logo.png" alt="logo" />
        <div>Orbiter's Dashboard</div>
      </div>
      <div class="maker-selected" v-if="makerAddressSelected">
        maker:
        <el-dropdown trigger="click">
          <span class="maker-selected__text">
            {{ makerAddressSelected }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in makerAddresses"
                :key="index"
                @click="onClickMakerAddressItem(item)"
              >
                {{ item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
import { defineComponent, provide, reactive, toRefs } from 'vue'
import { $axios } from './plugins/axios'

export default defineComponent({
  setup() {
    const state = reactive({
      menuActive: 'Home',
      makerAddresses: [] as string[],
      makerAddressSelected: '',
    })

    provide('makerAddressSelected', toRefs(state).makerAddressSelected)

    const menus = [
      {
        name: 'Home',
        link: '',
      },
      // {
      //   name: 'Compare',
      //   link: '',
      // },
      // {
      //   name: 'Graph',
      //   link: '',
      // },
    ]
    const onClickMenu = (menuName: string) => {
      state.menuActive = menuName
    }

    const getGlobalInfo = async () => {
      const resp = await $axios.get<{ makerAddresses: string[] }>('global')
      state.makerAddresses = resp.data.makerAddresses
      state.makerAddressSelected = state.makerAddresses?.[0] || ''
    }
    getGlobalInfo()
    const onClickMakerAddressItem = (makerAddress: string) => {
      state.makerAddressSelected = makerAddress
    }

    return {
      ...toRefs(state),

      menus,
      onClickMenu,
      onClickMakerAddressItem,
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
  display: flex;
  flex-direction: row;
  align-items: center;
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
    flex: 1;

    img {
      width: 40px;
      margin-right: 12px;
    }
  }

  .maker-selected {
    font-size: 13px;
    color: #888888;

    .maker-selected__text {
      border-radius: 28px;
      border: 1px solid #e8e8e8;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: #f8f8f8;
      }
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
      font-weight: bold;
      color: #000000aa;

      &.is-active,
      &:hover {
        background: #f8f8f8;
      }

      &.is-active {
        box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.15);
      }
    }
  }
}

.el-main {
  margin-top: $header-height;
  margin-left: $aside-width;
}
</style>
