<template>
  <el-container>
    <el-header>
      <div class="el-header__container">
        <div class="header-logo">
          <img src="./assets/logo.png" alt="logo" />
          <div>Orbiter Dashboard</div>
        </div>
        <el-menu
          :default-active="route.path"
          class="header-navs"
          mode="horizontal"
          :router="true"
        >
          <template v-for="(item, index) in navs" :key="index">
            <!-- If route.meta.navHide is undefined or navHide == false, display -->
            <el-menu-item v-if="!item.meta.navHide" :index="item.path">
              {{ item.name }}
            </el-menu-item>
          </template>
        </el-menu>
        <div class="header-maker" v-if="makerAddressSelected">
          <el-dropdown trigger="click">
            <div class="header-maker__text">
              {{ makerAddressSelected }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </div>
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
      </div>
    </el-header>
    <el-container>
      <!-- <el-aside>
      </el-aside> -->
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons'
import { provide, reactive, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import config from './config/index'
import http from "@/plugins/axios";

const route = useRoute()
const router = useRouter()
const navs = router.getRoutes()

const state = reactive({
  makerAddresses: [] as string[],
  makerAddressSelected: '',
  exchangeRates: {} as { [key: string]: string },
})
const makerAddressSelected = toRef(state, 'makerAddressSelected')
const makerAddresses = toRef(state, 'makerAddresses')
const exchangeRates = toRef(state, 'exchangeRates')

provide('makerAddressSelected', makerAddressSelected)
provide('exchangeRates', exchangeRates)

const getGlobalInfo = async () => {
  const chainConfig = config.chainConfig;
  state.exchangeRates = await http.get('/dashboard/rates');

  const list: any[] = ["0x80C67432656d59144cEFf962E8fAF8926599bCF8",
      "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
      "0x41d3D33156aE7c62c094AAe2995003aE63f587B3",
      "0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC",
      "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
      "0x1C84DAA159cf68667A54bEb412CDB8B2c193fb32"];
  state.makerAddresses = list;

  const mk: string = router?.currentRoute?._value?.query?.makerAddress;
  const reg = new RegExp(/^0x[a-fA-F0-9]{40}$/);
  const isAddress = reg.test(mk);
  if (isAddress) {
    state.makerAddresses.push(mk);
    state.makerAddressSelected = String(mk) || state.makerAddresses?.[0];
  } else {
    state.makerAddressSelected = state.makerAddresses?.[0] || '';
  }
}
const onClickMakerAddressItem = (makerAddress: string) => {
  state.makerAddressSelected = makerAddress
}
getGlobalInfo()
</script>

<style lang="scss" scoped>
$header-height: 60px;
$aside-width: 200px;
$max-width: 1600px;

.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: white;
  border-bottom: 1px solid #{var(--el-border-color-base)};
  padding: 0;
  z-index: var(--el-index-popper);

  .el-header__container {
    max-width: $max-width;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: $header-height;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }

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

  .header-navs {
    flex: 1;
    margin-left: 36px;
    background-color: transparent;
  }

  .header-maker {
    font-size: 13px;
    color: #888888;

    .header-maker__text {
      border-radius: 28px;
      border: 1px solid #e8e8e8;
      padding: 8px;
      display: flex;
      flex-direction: row;
      cursor: pointer;

      &:hover {
        background: #f8f8f8;
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
  // margin-left: $aside-width; // hide aside
  margin: $header-height auto 0 auto;
  max-width: $max-width;
}
</style>
