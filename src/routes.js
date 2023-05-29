import {createRouter, createWebHistory} from 'vue-router'
import FormEdit from './components/App-formEdit/App-formEdit'
import FormView from './components/App-formView/App-formView'

const routes = [
    {
        path: '/',
        component: FormEdit
    },
    {
        path: '/view',
        name: 'view',
        component: FormView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router