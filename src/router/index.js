import Vue from 'vue'
import Router from 'vue-router'

// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }
Vue.use(Router)


/* 初始路由 */
export default new Router({
    routes: [
        {
            path: '',
            component: () => import('@/pages/layout/index'),
            name: 'container',
            redirect:'/home',
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '/home',
                    component: () => import('@/pages/home/index'),
                    name: 'home',
                    meta: {
                        name: '首页',
                        icon: 'icon-home'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/pages/login')
        }, {
            path: '/register',
            component: () => import('@/pages/register')
        },
        {
            path: '/403',
            component: () => import('@/pages/errorPage/403')
        },
        {
            path: '/404',
            component: () => import('@/pages/errorPage/404')
        }
    ]
})


