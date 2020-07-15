import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'
import adminRoutes from './adminRoutes'
import { fetchPermission } from './api'


const state = {
    get UserToken() {
        console.log('778899')
        return localStorage.getItem('Authorization')
    },
    set UserToken(value) {
        localStorage.setItem('Authorization', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: [],
    permissionList: null /** 所有路由 */,
    sidebarMenu: [] /** 导航菜单 */,
    currentMenu: '' /** 当前active导航菜单 */
}

const actions = {
    //permission的文件
    async FETCH_PERMISSION({ commit, state }) {
        // let data = await fetchPermission()
        let routes = adminRoutes
        let initialRoutes = router.options.routes

        let MainContainer = initialRoutes.find(v => {
            return v.path === '/'
        })

        let children = MainContainer.children
        children.push(...routes)

        /* 生成左侧导航菜单 */
        commit('SET_MENU', children)
        setDefaultRoute([MainContainer])
        //下面是生成跳转用的路由，上面是生成左侧菜单的路由

        /*  初始路由 只有一个login*/


        /*  动态添加路由 */
        router.addRoutes(initialRoutes)

        /* 完整的路由表 */
        commit('SET_PERMISSION', [...initialRoutes])
        console.log(initialRoutes, 'permissionList')
    }
}
const mutations = {
    //登录 设置roken
    LOGIN_IN(state, token) {
        state.UserToken = token
    },
    //登出 清除token
    LOGIN_OUT(state) {
        state.UserToken = ''
    },
    // 面包屑 的收起与展开
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    //设置面包屑导航列表
    setCrumbList(state, list) {
        state.crumbList = list
    },

    //登录时设置 permission文件
    SET_PERMISSION(state, routes) {
        state.permissionList = routes
    },
    //登出时清空
    CLEAR_PERMISSION(state) {
        state.permissionList = null
    },
    //登录时 设置左侧菜单
    SET_MENU(state, menu) {
        state.sidebarMenu = menu
    },
    //登出时 清空左侧菜单
    CLEAR_MENU(state) {
        state.sidebarMenu = []
    },
    //设置当前的路由
    SET_CURRENT_MENU(state, currentMenu) {
        state.currentMenu = currentMenu
    }

}

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
})


// //路由拼接的函数
function recursionRouter(userRouter = [], allRouter = []) {
    var realRoutes = []
    allRouter.forEach((v, i) => {
        userRouter.forEach((item, index) => {
            if (item.name === v.meta.name) {
                if (item.children && item.children.length > 0) {
                    v.children = recursionRouter(item.children, v.children)
                }
                realRoutes.push(v)
            }
        })
    })
    return realRoutes
}

/**
 *
 * 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
function setDefaultRoute(routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}
