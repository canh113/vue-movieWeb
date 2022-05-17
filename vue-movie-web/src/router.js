
import Home from './components/Home.vue';
import Form from "./components/Form.vue";
import ListMovie from "./components/ListMovie.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/form', component: Form },
    { path: '/list', component: ListMovie },
];
export default routes;

