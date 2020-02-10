<template lang='pug'>
  div.add-more-container
    div.flex-between.row(@click="isDrawerOpen = !isDrawerOpen")
      h4 Add More
      div.icon-button.mdi(:class="classNameOfActionButton")
    div.hidden.toggle-drawer(:id="idOfToggleDrawer")
      div.label-container
        label Name
      input(type="text" id="add-name" v-model="name")
      div.input-container
        div.input.label-container
          label What's Copied
        input(type="text" id="add-value" v-model="valueToCopy")
      div.flex-end
        button#save-button(@click="save") Save
</template>

<script>
export default {
  name: 'AddMore',
  data(){
    return {
      name: '',
      valueToCopy: '',
      isDrawerOpen: false
    }
  },
  computed: {
    classNameOfActionButton(){
      return this.isDrawerOpen
        ? 'mdi-minus-box add-more-closed'
        : 'mdi-plus-box add-more-open'
    },
    idOfToggleDrawer(){
      return this.isDrawerOpen
        ? 'add-more-toggle-open'
        : 'add-more-toggle-closed'
    }
  },
  methods: {
    save(){
      let cssId = this.name.toLowerCase()
      cssId = cssId.split(' ').join('-') + '-id'
      const newItemToBeStored = {
        cssId,
        text: this.name,
        valueToCopy: this.valueToCopy
      }
      this.isDrawerOpen = false
      this.valueToCopy = ''
      this.name = ''
      setTimeout(() => {
        this.$emit('saved', newItemToBeStored)
      }, 500)
    }
  }
}
</script>

<style lang='sass'>
  .add-more-container
    cursor: pointer
  .toggle-drawer
    transition: all 0.3s
  .add-more-closed
    color: #c71717
  .add-more-open
    color: #0cbe15
  #add-more-toggle-open
    max-height: 500px
  #add-more-toggle-closed
    max-height: 0
</style>