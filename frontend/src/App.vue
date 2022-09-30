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
          <el-menu-item index="/makerNode" v-show="isLink">
            MakerNode
          </el-menu-item>
        </el-menu>
        <div class="link_wallet">
          <el-button v-if="!isLink" size="small" round @click="getLinksStatus">Connct a Wallet</el-button>
          <span v-else>{{walletAccount}}</span>
        </div>
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
          <transition name="el-fade-in-linear">
            <router-view  v-if="isReload"/>
          </transition>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons'
import { provide, reactive, toRef, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $axios } from './plugins/axios'
import store from './store'
import util from './utils/util'
import { contract_obj, defaultChainInfo } from './contracts'

const route = useRoute()
const router = useRouter()
const navs = router.getRoutes()
const isReload = ref(true)

const state = reactive({
  makerAddresses: [] as string[],
  makerAddressSelected: '',
  exchangeRates: {} as { [key: string]: string },
})
const makerAddressSelected = toRef(state, 'makerAddressSelected')
const makerAddresses = toRef(state, 'makerAddresses')
const exchangeRates = toRef(state, 'exchangeRates')
const reload = () => {
  isReload.value = false;
  nextTick(() => {
    isReload.value = true;
  })
}

provide('makerAddressSelected', makerAddressSelected)
provide('exchangeRates', exchangeRates)
provide('reload', reload)

const isLink = ref(false)
const isMaker = ref(false)
const walletAccount = ref()
const getLinksStatus = async () => {
  try {
    const ethereum = (window as any).ethereum
    if (!ethereum) {
      throw new Error('Please install metamask wallet first!')
    }
    const addr = await ethereum.request({ method: 'eth_requestAccounts' })
    store.commit('setAccount', addr[0])
    // let isCheck = true
    let isCheck = false
    if (ethereum.networkVersion != defaultChainInfo.chainid) {
      isCheck = await linkNetwork()
    } else {
      isCheck = true
    }
    if (isCheck) {
      walletAccount.value = util.shortAddress(addr[0])
      isLink.value = true
      router.addRoute({
        path: '/makerNode',
        name: 'MakerNode',
        component: () => import('./views/MakerNode/MakerNode.vue'),
      })
      let contract_factory = await contract_obj('ORMakerV1Factory')
      let makerAddr = await contract_factory.methods.getMaker(addr[0]).call()
      console.log(makerAddr)
      if (makerAddr != '0x0000000000000000000000000000000000000000') {
        isMaker.value = true
        store.commit('setIsMaker', true)
        store.commit('setMaker', makerAddr.toLowerCase())
      } else {
        isMaker.value = false
        store.commit('setIsMaker', false)
      }
    }
    
    ethereum.on("chainChanged", function network(networkIDstring) {
      console.log("networkIDstring ==>", networkIDstring)
    });
    
    ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length != 0) {
          walletAccount.value = util.shortAddress(accounts[0])
          store.commit('setAccount', accounts[0])
          location.reload()
        } else {
          isLink.value = false
          router.removeRoute('MakerNode')
        }
    });
    
  } catch (error) {
    throw new Error(`links err:${error}`);
  }
}
getLinksStatus()

const linkNetwork = async ():Promise<boolean> => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    return false
  }
  console.log(defaultChainInfo)
  const result = await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: defaultChainInfo.chainid,
          chainName: defaultChainInfo.name,
          nativeCurrency: {
            name: defaultChainInfo.symbol,
            symbol: defaultChainInfo.symbol,
            decimals: defaultChainInfo.decimals
          },
          rpcUrls: [defaultChainInfo.rpcUrls],
          blockExplorerUrls: [defaultChainInfo.blockExplorerUrls]
        }
      ]
  })
  return result;
  // .then(() => {
  //     return true
  // }).catch(() => {
  //     return false
  // })
}

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
  .link_wallet {
    margin-right: 10px;
    span {
      border-radius: 20px;
      padding: 3px 10px;
      border: 1px solid #e8e8e8;
    }
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
<style lang="scss">
.fl {
	float: left;
}
.fr {
	float: right;
}

.clearfix::after {
	content: "";
	display: block;
	clear: both;
}
</style>
