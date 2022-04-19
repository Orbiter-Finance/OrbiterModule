<template>
  <el-container>
    <el-header>
      <div class="el-header__container">
        <div class="header-logo">
          <img src="./assets/logo.png" alt="logo" />
          <div>Orbiter Dashboard</div>
        </div>
        <el-menu
          :default-active="navActive"
          class="header-navs"
          mode="horizontal"
          :router="true"
        >
          <template v-for="(item, index) in navs" :key="index">
            <!-- If route.meta.navHide is undefined or navHide == false, display -->
            <el-menu-item v-if="item.meta.navShow" :index="item.path">{{
              item.name
            }}</el-menu-item>
          </template>
        </el-menu>
        <div class="header-maker" v-if="makerAddressSelected">
          <el-dropdown trigger="click">
            <div class="header-maker__text">
              {{ makerAddressSelected }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in makerAddresses"
                  :key="index"
                  @click="onClickMakerAddressItem(item)"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- <el-aside>
      </el-aside>-->
      <el-container>
        <el-main>
          <Suspense>
            <router-view />
          </Suspense>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { ArrowDown } from '@element-plus/icons'
import {
  defineComponent,
  provide,
  reactive,
  toRefs,
  watch,
  onMounted,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $axios } from './plugins/axios'
// import store from './store'
// import * as CryptoJS from 'crypto-js'

export default defineComponent({
  components: {
    ArrowDown,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      navs: router.getRoutes(),
      navActive: '/',
      makerAddresses: [] as string[],
      makerAddressSelected: '',
      exchangeRates: {} as { [key: string]: string },
    })

    provide('makerAddressSelected', toRefs(state).makerAddressSelected)
    provide('exchangeRates', toRefs(state).exchangeRates)

    const getGlobalInfo = async () => {
      const resp = await $axios.get('global')
      state.makerAddresses = resp.data.makerAddresses
      state.exchangeRates = resp.data.exchangeRates

      state.makerAddressSelected = state.makerAddresses?.[0] || ''

      // Set makerAddressSelected from route.query.makerAddress
      setTimeout(() => {
        const makerAddress = String(route.query.makerAddress)
        if (state.makerAddresses.indexOf(makerAddress) > -1) {
          state.makerAddressSelected = makerAddress
        }
      }, 1)
    }
    getGlobalInfo()
    const onClickMakerAddressItem = (makerAddress: string) => {
      state.makerAddressSelected = makerAddress
    }
    onMounted(() => {
      // const cipherS3Proof = localStorage.getItem('s3Proof')
      // if (cipherS3Proof) {
      //   const bytes = CryptoJS.AES.decrypt(cipherS3Proof, 'netstate')
      //   const originalText = bytes.toString(CryptoJS.enc.Utf8)
      //   store.commit('setS3Proof', originalText)
      // }
    }),
      // watch
      watch(
        () => route.path,
        (nv) => {
          state.navActive = nv
        }
      )

    return {
      ...toRefs(state),

      onClickMakerAddressItem,
    }
  },
})
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
  z-index: 100;

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
