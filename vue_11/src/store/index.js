import { createStore } from 'vuex'
const store = createStore({
    state: {
        add: 0,
        reduce: 100
    },
    mutations: {
        increase(state) {
            state.add++
        },
        decrease(state) {
            state.reduce--
        }
    },
    actions: {},
    modules: {}
})
export default store