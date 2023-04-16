<template>
	<section>
		<h2>{{ teamName }}</h2>
		<ul>
			<user-item
				v-for="member in members"
				:key="member.id"
				:name="member.fullName"
				:role="member.role"
			></user-item>
		</ul>
		<router-link to="/teams/t2">to t2</router-link>
	</section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
	inject: ['users', 'teams'],
	props: ['teamId'],
	// 这个teamId来源于TeamsItem的函数teamMembersLink，通过:to="teamMembersLink"将值传递过来
	// 因为本来是to="/teams/t2" 这种形式，在main.js中添加props：true属性后，t1就作为参数被v-bind to给传递'/teams/:teamId'中的teamId

	components: {
		UserItem,
	},
	data() {
		return {
			teamName: '',
			members: [],
		};
	},
	methods: {
		loadTeamMembers(teamId) {
			// const teamId = route.params.teamId;
			console.log(this);
			console.log('teamId:', teamId);
			const selectedTeam = this.teams.find((team) => team.id == teamId);
			const members = selectedTeam.members;
			const selectedMembers = [];
			for (const member of members) {
				const selectedUser = this.users.find(
					(user) => user.id == member
				);
				selectedMembers.push(selectedUser);
			}
			this.members = selectedMembers;
			this.teamName = selectedTeam.name;
		},
	},

	created() {
		this.loadTeamMembers(this.teamId);
		console.log(this.$route.query);
	},
	beforeRouteUpdate(to, from, next) {
		console.log('teamMembers cmp beforeRouteUpdate');
		console.log(to, from);
		// this.loadTeamMembers(to.params.teamId);
		next();
	},
	watch: {
		teamId(newId) {
			this.loadTeamMembers(newId);
		},
	},
};
</script>

<style scoped>
section {
	margin: 2rem auto;
	max-width: 40rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
	border-radius: 12px;
}

h2 {
	margin: 0.5rem 0;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
