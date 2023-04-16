<template>
	<li>
		<h3>{{ name }}</h3>
		<div class="team-members">{{ memberCount }} Members</div>
		<router-link :to="teamMembersLink">View Members</router-link>
		<!-- 传送回来的字符串是完整的路由地址，会显示/teams/t1或者/teams/t2、/teams/t2，显示的/teams/t1不会跳转到另一个页面，因为这里使用了子路由，也就是将teammember作为teams的子路由显示在默认的路由/teams的组件teamslist的顶部 -->
	</li>
</template>

<script>
export default {
	props: ['id', 'name', 'memberCount'],
	computed: {
		teamMembersLink() {
			// return '/teams/' + this.id;
			return {
				name: 'team-members',
				params: { teamId: this.id }, //传送参数的值
				query: { sort: 'asc' },
			}; //动态路由
		},
	},
};
</script>

<style scoped>
li {
	margin: 1rem 0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	border-radius: 12px;
	padding: 1rem;
}

li h3 {
	margin: 0.5rem 0;
	font-size: 1.25rem;
}

li .team-members {
	margin: 0.5rem 0;
}

a {
	text-decoration: none;
	color: white;
	display: inline-block;
	padding: 0.5rem 1.5rem;
	background-color: #11005c;
}

a:hover,
a:active {
	background-color: #220a8d;
}
</style>
