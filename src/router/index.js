import Vue from 'vue';
import VueRouter from 'vue-router';

// components
import fileUpload from '../components/fileUpload.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/fileUpload', component: fileUpload }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

export default router;