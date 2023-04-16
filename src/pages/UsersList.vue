<template>
	<button @click="confirmInput">confirm</button>
	<button @click="saveyourChanges">Save changes</button>
	<ul>
		<user-item
			v-for="user in users"
			:key="user.id"
			:name="user.fullName"
			:role="user.role"
		></user-item>
	</ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
	components: {
		UserItem,
	},
	inject: ['users'],
	data() {
		return {
			changesSaved: false,
		};
	},
	methods: {
		confirmInput() {
			this.$router.push('/teams');
		},
		saveyourChanges() {
			this.saveChanges = true;
		},
	},
	beforeRouteEnter(to, from, next) {
		console.log('userslist cmp breforeRouterEnter');
		console.log(to, from);
		next();
	},
	beforeRouteLeave(to, from, next) {
		console.log('userlist cmp beforeRouteLeave');
		console.log(to, from);
		if (this.changesSaved) {
			next();
		} else {
			const userWantstoLeave = confirm(
				'Are you sure? you got unsaved changes!'
			);
			next(userWantstoLeave);
		}
	},
	unmounted() {
		console.log('unmounted');
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	margin: 2rem auto;
	max-width: 20rem;
	padding: 0;
}
</style>
