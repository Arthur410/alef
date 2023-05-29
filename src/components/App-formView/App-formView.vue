<template>
  <main class="view">
    <div class="container">
      <div class="personal-data" >
        <h1 class="title">Персональные данные</h1>
        <p v-if="data.name && data.age" class="personal-data__content">{{data.name}}, {{data.age}} лет</p>
        <p v-else>Отсутствуют</p>
      </div>
      <div class="children-data">
        <h1 class="title">Дети</h1>
        <div class="children-items" v-if="data.children">
          <div class="children" v-for="child in data.children" :key="child.id">
            <p v-if="child.name && child.age">{{child.name}}, {{child.age}} лет</p>
            <p v-else>Ребенок был создан, но имя или возраст не были заданы</p>
          </div>
        </div>
        <p v-else>Отсутствуют</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "App-formView",
  data() {
    return {
      data: this.$store.state.userData,
    }
  },
}
</script>

<style scoped>
@import url('./App-formView-styles.css');
</style>