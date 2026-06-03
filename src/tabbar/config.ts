import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'
import type { CustomTabBarItem, NativeTabBarItem } from './types'

export const TABBAR_STRATEGY_MAP = {
  NO_TABBAR: 0,
  NATIVE_TABBAR: 1,
  CUSTOM_TABBAR: 2,
}

// 使用自定义 tabbar（支持 UnoCSS 图标，无需切图）
export const selectedTabbarStrategy = TABBAR_STRATEGY_MAP.CUSTOM_TABBAR

// 原生 tabbar 配置（备用）
export const nativeTabbarList: NativeTabBarItem[] = [
  { iconPath: 'static/tabbar/home.png', selectedIconPath: 'static/tabbar/homeHL.png', pagePath: 'pages/index/index', text: '首页' },
  { iconPath: 'static/tabbar/home.png', selectedIconPath: 'static/tabbar/homeHL.png', pagePath: 'pages/content/list', text: '攻略' },
  { iconPath: 'static/tabbar/home.png', selectedIconPath: 'static/tabbar/homeHL.png', pagePath: 'pages/destination/list', text: '目的地' },
  { iconPath: 'static/tabbar/home.png', selectedIconPath: 'static/tabbar/homeHL.png', pagePath: 'pages/consult/index', text: '专属定制' },
  { iconPath: 'static/tabbar/personal.png', selectedIconPath: 'static/tabbar/personalHL.png', pagePath: 'pages/me/me', text: '我的' },
]

// 自定义 tabbar 配置（当前使用）
export const customTabbarList: CustomTabBarItem[] = [
  {
    text: '首页',
    pagePath: 'pages/index/index',
    iconType: 'unocss',
    icon: 'i-carbon-home',
  },
  {
    text: '攻略',
    pagePath: 'pages/content/list',
    iconType: 'unocss',
    icon: 'i-carbon-book',
  },
  {
    text: '目的地',
    pagePath: 'pages/destination/list',
    iconType: 'unocss',
    icon: 'i-carbon-map',
  },
  {
    text: '专属定制',
    pagePath: 'pages/consult/index',
    iconType: 'unocss',
    icon: 'i-carbon-star',
  },
  {
    pagePath: 'pages/me/me',
    text: '我的',
    iconType: 'unocss',
    icon: 'i-carbon-user',
  },
]

export const tabbarCacheEnable
  = [TABBAR_STRATEGY_MAP.NATIVE_TABBAR, TABBAR_STRATEGY_MAP.CUSTOM_TABBAR].includes(selectedTabbarStrategy)

export const customTabbarEnable = [TABBAR_STRATEGY_MAP.CUSTOM_TABBAR].includes(selectedTabbarStrategy)

export const needHideNativeTabbar = selectedTabbarStrategy === TABBAR_STRATEGY_MAP.CUSTOM_TABBAR

const _tabbarList = customTabbarEnable ? customTabbarList.map(item => ({ text: item.text, pagePath: item.pagePath })) : nativeTabbarList
export const tabbarList = customTabbarEnable ? customTabbarList : nativeTabbarList

const _tabbar: TabBar = {
  custom: selectedTabbarStrategy === TABBAR_STRATEGY_MAP.CUSTOM_TABBAR,
  color: '#666666',
  selectedColor: '#C9A84C',
  backgroundColor: '#0D0D0D',
  borderStyle: 'black',
  height: '50px',
  fontSize: '10px',
  iconWidth: '24px',
  spacing: '3px',
  list: _tabbarList as unknown as TabBar['list'],
}

export const tabBar = tabbarCacheEnable ? _tabbar : {}
