export default ({ Vue, isServer }) => {
    if (!isServer) {
        // 输出开发调试的日志信息
        import('vue-toasted' /* webpackChunkName: "notification" */).then((module) => {
            Vue.use(module.default)
        })
    }
}