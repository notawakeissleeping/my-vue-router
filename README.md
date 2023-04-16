# 📝 Vue3-router 的使用

这是一个简单的教程，介绍了如何使用 Vue3-router。

## 在 main.js 中

首先需要将路由放入应用中，然后创建一个路由实例，在此实例中定义一些路由，包括路径和组件名，最后将该实例应用于 `app`。

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: TeamsList
    },
    {
      path: '/users',
      component: UsersList
    }
  ]
})

app.use(router)
```

## 在 App.vue 中

在 `App.vue` 中，直接使用官方提供的 `<router-view></router-view>`，它会根据路由渲染不同的组件。

## Vue3-router 的路由传参 props 例子，或者叫做路由间通信

在父组件 `TeamsItem.vue` 中，使用 `router-link` 标签来传递参数，然后在子组件 `TeamMembers.vue` 中使用 `props` 来接收该参数，从而实现路由间通信。

```html
<!-- 父组件 TeamsItem.vue -->
<router-link :to="teamMembersLink">View Members</router-link>

computed: {
  teamMembersLink() {
    return '/teams/' + this.id
  }
}

<!-- 子组件 TeamMembers.vue -->
props: ['teamId'],
```

在 `main.js` 中的配置中，也需要设置 `props: true` 属性，这样就可以将 `teamId` 参数作为路径传递到 `TeamMembers.vue` 组件中，提高了组件的复用性。

## 嵌套路由

使用了嵌套路由后，组件在同一个页面上加载了，而不是跳转到另一个页面。通过在 routers 的对象中添加 `children` 属性实现。

```javascript
{
  name: 'teams',
  path: '/teams',
  components: { default: TeamsList, footer: TeamFooter },
  children: [
    {
      name: 'team-members',
      path: ':teamId',
      component: TeamMembers,
      props: true
    }
  ]
}
```

在 `TeamsItem.vue` 中，使用 `computed` 属性来传递 `teamId` 参数。

```html
<!-- TeamsItem.vue -->
<router-link :to="teamMembersLink">View Members</router-link>

props: ['id', 'name', 'memberCount'],

computed: {
  teamMembersLink() {
    return {
      name: 'team-members',
      params: { teamId: this.id },
      query: { sort: 'asc' }
    }
  }
}
```

在父组件teamsList最上方显示 `<router-view></router-view>`（teammembers的占位符），这样就可以在同一个页面上显示组件了。

## 命名路由

通过命名路由跳转，使用 `params` 声明要传递的参数。

```html
<!-- 命名路由 -->
<router-link :to="teamMembersLink">View Members</router-link>

computed: {
  teamMembersLink() {
    return {
      name: 'team-members',
      params: { teamId: this.id },
      query: { sort: 'asc' }
    }
  }
}
```

## 多路由

在 `main.js` 中，可以使用 `components` 属性来声明多个组件，并设置默认状态下的组件。通过 `name` 来区分默认与要做其他设置的组件。

```javascript
{
  path: '/users',
  components: { default: UsersList, footer: UserFooter }
}
```

最上方显示 `<router-view name="footer"></router-view>`，这样就可以在不同的页面显示不同的页脚。

## 编程式路由导航

在编程式路由导航中，可以通过点击按钮实现路由导航。使用 `$router.push()` 来实现页面跳转。

```javascript
methods: {
  gotoLk() {
    this.$router.push('/movie/1')
  },
  gotoLk2() {
    this.$router.replace('/movie/1')
  }
}
```

在其他情况下，也可以使用 `$router.push()` 来跳转到指定的页面。例如，通过路径、带路径的对象、命名的路由等方式来实现页面跳转。

```javascript
router.push('/users/eduardo')
router.push({ path: '/users/eduardo' })
router.push({ name: 'user', params: { username: 'eduardo' } })
router.push({ path: '/register', query: { plan: 'private' } })
router.push({ path: '/about', hash: '#team' })
```

需要注意的是，如果提供了 `path`，`params` 会被忽略。如果想要使用 `params`，需要提供路由的 `name` 或者手写完整的带有参数的 `path`。

```javascript
const username = 'eduardo'

router.push(`/user/${username}`)
router.push({ path: `/user/${username}` })
router.push({ name: 'user', params: { username } })
```
🥳更多详细情况写在注释中
