import Vue from 'vue'
import App from '@/App'
import store from '@/store/index'
import router from '@/router/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
// import * as globalFilter from './filters/filters'


// Object.keys(globalFilter).forEach(key => {
//     Vue.filter(key, globalFilter[key])
// })
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图/柱状图等组件
require('echarts/lib/chart/line')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例滚动
//vue全局注入echarts
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (!store.state.UserToken) {
        if (
            to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth)
        ) {
            next()
        } else {
            next({ path: '/login' })

        }

    } else {
        if (!store.state.permissionList) {

            store.dispatch('FETCH_PERMISSION').then(() => {
                next({ path: to.path })
            })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})

router.afterEach((to, from, next) => {
    var routerList = to.matched
    store.commit('setCrumbList', routerList)
    store.commit('SET_CURRENT_MENU', to.name)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
