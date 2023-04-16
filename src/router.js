import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import UserFooter from './pages/UserFooter.vue';
import TeamFooter from './pages/TeamFooter.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/teams',
		},
		{
			name: 'teams',
			path: '/teams',
			// component: TeamsList,
			// 可以有多个组件,
			meta: { needsAuth: true },
			components: { default: TeamsList, footer: TeamFooter },
			children: [
				{
					name: 'team-members',
					path: ':teamId',
					component: TeamMembers,
					props: true,
				},
			],
		},
		{
			path: '/users',
			components: { default: UsersList, footer: UserFooter },
			beforeEnter(to, from, next) {
				console.log('users beforeEnter');
				console.log(to, from);
				next();
			},
		},
		// {
		// 	path: '/teams/:teamId',
		// 	component: TeamMembers,
		// 	props: true,动态路由
		// },
		{
			path: '/:notFound(.*)',
			component: NotFound,
		},
	],
	linkActiveClass: 'active',
	scrollBehavior(to, from, savedPosition) {
		console.log(to, from, savedPosition);
		if (savedPosition) {
			return savedPosition;
		}
		return { left: 0, top: 0 };
	},
});
router.beforeEach(function (to, from, next) {
	console.log('Global beforeEach');
	if (to.meta.needsAuth) {
		console.log('Need auth');
		next();
	} else {
		next();
	}
	// if (to.name === 'team-members') {
	// 	next();
	// } else {
	// 	next({ name: 'team-members', params: { teamId: 't2' } });
	// }
	console.log(to, from);
	next();
});
router.afterEach(function (to, from) {
	console.log('Global afterEach');
	console.log(to, from);
});

export default router;
