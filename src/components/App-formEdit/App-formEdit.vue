<template>
  <div class="container">
    <form class="forms">
      <div class="personal-form">
        <h1 class="personal-form__title">Персональные данные</h1>
        <div class="personal-form__inputs">
          <div class="name">
            <label>Имя</label>
            <input v-model="currentUserName" type="text">
          </div>
          <div class="mt-10"></div>
          <div class="age">
            <label>Возраст</label>
            <input v-model="currentUserAge" type="text" @keypress="isNumber($event, $event.target)">
          </div>
        </div>
      </div>
      <div class="children-form">
        <div class="children-form__header">
          <h1 class="children-form__title">Дети (макс. 5)</h1>
          <button v-if="currentUserChildren.length < 5" @click.prevent="addChild" class="add-children">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.13332 10.8556C4.50125 10.8555 3.98887 11.3679 3.98887 12C3.98887 12.6321 4.50126 13.1445 5.13332 13.1445L10.8554 13.1445L10.8554 18.8668C10.8554 19.4989 11.3678 20.0113 11.9999 20.0113C12.632 20.0113 13.1444 19.4989 13.1444 18.8668L13.1443 13.1445L18.8667 13.1445C19.4988 13.1445 20.0112 12.6321 20.0112 12C20.0112 11.3679 19.4988 10.8556 18.8667 10.8556L13.1443 10.8556L13.1443 5.13338C13.1443 4.50132 12.632 3.98893 11.9999 3.98893C11.3678 3.98893 10.8554 4.50131 10.8554 5.13338L10.8554 10.8556L5.13332 10.8556Z" fill="#01A7FD"/>
            </svg>
            Добавить ребенка</button>
        </div>
        <div class="children-form__inputs">
          <div v-for="(child, index) in currentUserChildren" :key="index" class="children-form__inputs_element">
            <div class="name">
              <label>Имя</label>
              <input v-model="child.name" type="text">
            </div>
            <div class="age">
              <label>Возраст</label>
              <input v-model="child.age" @keypress="isNumber($event, $event.target)" type="text">
            </div>
            <button @click.prevent="removeChild(index)">Удалить</button>
          </div>
        </div>
        <button  @click.prevent="saveData" class="children-form__save-button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "App-form",
  data() {
    return {
      currentUserName: '',
      currentUserAge: '',
      currentUserChildren: [],
    }
  },

  computed: {
    ...mapGetters(['getUserData'])
  },

  mounted() {
    this.restoreState()
  },

  methods: {
    ...mapActions(['saveUserData']),

    saveData() {
      let validate = true

      if (!this.currentUserName) {
        validate = false
      }

      if (!this.currentUserAge) {
        validate = false
      }

      const userData = {
        name: this.currentUserName,
        age: this.currentUserAge,
        children: this.currentUserChildren
      };


      const isAnyFieldEmpty = userData.children.some(obj => {
        return obj.name === "" || obj.age === "";
      });

      if (isAnyFieldEmpty) {
        validate = false
      }

      if (validate) {
        console.log(userData)
        this.saveUserData(userData);
        alert("Данные успешно сохранены.")
      } else {
        alert("Перепроверьте, пожалуйста, данные. Некоторые из них не введены.")
      }
    },

    restoreState() {
      const data = this.getUserData
      if (data.name ) {
        this.currentUserName = data.name
      }

      if (data.age) {
        this.currentUserAge = data.age
      }

      if(data.children) {
        this.currentUserChildren = data.children
      }
    },

    addChild() {
      this.currentUserChildren.push({
        name: '',
        age: ''
      });
    },

    removeChild(index) {
      this.currentUserChildren.splice(index, 1);
    },

    isNumber: function(evt, evtTarget) {
      evt = (evt) ? evt : window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();

        evtTarget.parentNode.style.border = "1px solid red"
        evtTarget.parentNode.firstChild.innerHTML = "Возраст (допустимы только числа!)"
        evtTarget.parentNode.firstChild.style.color = "red"

        setTimeout(() => {
          evtTarget.parentNode.style.border = "1px solid rgba(0,0,0,.1)"
          evtTarget.parentNode.firstChild.innerHTML = "Возраст"
          evtTarget.parentNode.firstChild.style.color = "rgba(17, 17, 17, 0.48)"
        }, 500)

      } else {
        evtTarget.parentNode.style.border = "1px solid rgba(0,0,0,.1)"
        evtTarget.parentNode.firstChild.style.color = "rgba(17, 17, 17, 0.48);"
        return true;
      }
    }
  },

}
</script>

<style scoped>
@import url('./App-formEdit-styles.css');
</style>