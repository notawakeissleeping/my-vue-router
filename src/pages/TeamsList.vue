<template>
	<router-view></router-view>
	<!-- 这个router-view是用来显示teammembers的，teammembers在这里是/teams的子路由 -->
	<ul>
		<teams-item
			v-for="team in teams"
			:key="team.id"
			:id="team.id"
			:name="team.name"
			:member-count="team.members.length"
		></teams-item>
	</ul>
</template>
<!-- teamlist作为一个组件，其本身就是/和/teams的默认路由组件，再在其中写 router-view，就是在其中写了一个子路由，然后再在router.js中设置这个router-view作为子路由teamsmember的显示区域，就完成了一个单页面的展示功能实现-->
<script>
import TeamsItem from '../components/teams/TeamsItem.vue';

export default {
	components: {
		TeamsItem,
	},
	inject: ['teams'],
};
</script>

<style scoped>
ul {
	list-style: none;
	margin: 2rem auto;
	max-width: 40rem;
	padding: 0;
}
</style>
