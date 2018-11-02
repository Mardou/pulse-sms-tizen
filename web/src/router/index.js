import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/'

import Login from '@/components/Login.vue'
import Thread from '@/components/Thread/'
import Compose from '@/components/Compose/'
import Conversations from '@/components/Conversations/'

Vue.use(VueRouter)

let router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'conversations-list',
            component: Conversations,
            props: { 'index': 'index_public_unarchived', 'small': false },
        },
        {
            path: '/archived',
            name: 'conversations-list-archived',
            component: Conversations,
            props: { 'index': 'index_archived', 'small': false },
        },
        {
            path: '/private',
            name: 'conversations-list-private',
            component: Conversations,
            props: { 'index': 'index_private', 'small': false },
        },
        {
            path: '/folder/:folderId',
            name: 'conversations-list-folder',
            component: Conversations,
            props: true,
        },
        {
            path: '/thread/:threadId',
            name: 'thread',
            component: Thread,
            props: true,
        },
        {
            path: '/thread/:threadId/archived',
            name: 'thread-archived',
            component: Thread,
            props: true,
        },
        {
            path: '/compose',
            name: 'Compose',
            component: Compose,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.name == null)
        return next({name: 'conversations-list'});

    if (to.name == 'login')
        return next();

    if (store.state.account_id == '' )
        return next({name: 'login'});

    next();
})

// This script is a work around for github pages deployments.
// If a redirect session is created, delete and redirect
var redirect = sessionStorage.redirect;
delete sessionStorage.redirect;

if (redirect && redirect != location.href)
    router.replace(redirect.split(location.host)[1])

export default router
