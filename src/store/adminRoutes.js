
/* 需要权限判断的路由,本地写好了 */
const adminRoutes = [

    {
        path: 'goods',
        name: 'goods',
        component: () => import('@/pages/main'),
        meta: {
            name: '产品管理',
            icon: 'icon-order-manage'
        },
        children: [
            {
                path: '/goods-list',
                name: 'goods-list',
                component: () => import('@/pages/goods-manage/goods-list'),
                meta: {
                    name: '产品列表',
                    icon: 'icon-home'
                }
            },
            {
                path: '/goods-classify',
                name: 'goods-classify',
                component: () => import('@/pages/goods-manage/goods-classify'),
                meta: {
                    name: '产品分类',
                    icon: 'icon-product-manage'
                }
            }
        ]
    }
]

export default adminRoutes
