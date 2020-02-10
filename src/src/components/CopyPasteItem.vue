<template lang='pug'>
  div.container
    div.item-parent.flex-between
      div(:id="cssId" :data="valueToCopy") {{ text }}
      div.flex-between
        div.icon-button.edit-button.mdi.mdi-pencil(
          :id="`${cssId}-edit-action`" 
          @click="isEditShown = !isEditShown"
        )
        div.icon-button.mdi.mdi-content-copy(
          :id="`${cssId}-copy-action`" 
          @click="copyTextToKeyBoard"
        )
    div.hidden(:class="classNameForDrawerToggle")
      div.name-container
        div.input.label-container
          label Name
        input(type="text" id="add-value" v-model="nameOfItem")
      div.input-container
        div.input.label-container
          label What's Copied
        input(type="text" id="add-value" v-model="valueToCopyPaste")
      div.input-container
        div.action-container.flex-end
          button.delete-button(@click="deleteItem") Delete
          button.save-button(@click="saveEdits") Save
</template>

<script>
export default {
  name: 'CopyPasteItem',
  data(){
    return {
      nameOfItem: '',
      valueToCopyPaste: '',
      isEditShown: false
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    cssId: {
      type: String,
      required: true
    },
    valueToCopy: {
      type: String,
      required: true
    }
  },
  mounted(){
    this.nameOfItem = this.text
    this.valueToCopyPaste = this.valueToCopy
  },
  computed: {
    classNameForDrawerToggle(){
      return this.isEditShown
        ? 'edit-open'
        : ''
    }
  },
  methods: {
    copyTextToKeyBoard(){
      const tempInput = document.createElement('input')
      tempInput.value = this.valueToCopy
      tempInput.setAttribute('type', 'text')  
      document.body.append(tempInput)
      tempInput.select()
      document.execCommand('copy')
      tempInput.remove()
      this.$emit('copied')
    },
    saveEdits(){
      const updatedItem = {
        cssId: this.cssId,
        text: this.nameOfItem,
        valueToCopy: this.valueToCopyPaste
      }
      this.$emit('savedEdit', updatedItem)
      this.isEditShown = false
    },
    deleteItem(){
      this.$emit('deleteItem', this.cssId)
    }
  }
}
</script>

<style lang='sass'>
  .edit-open
    max-height: 500px !important
  .action-container
    margin: 15px 0
  .save-button
    color: #f2f2f2 
    background-color: #0cbe15
    margin-left: 15px
  .delete-button
    color: #f2f2f2
    background-color: #c71717
</style>