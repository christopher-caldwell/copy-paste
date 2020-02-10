<template lang='pug'>
  div.root
    div.flex-between.header-container
      h3 Copy to Clipboard
      CheckMark(v-if="showCheckMark")
    div(v-if="hasItemsStored")
      CopyPaste(
        v-for="(item, index) in storedCopyPastes" 
        :key="`${item.cssId}-${index}-id`"
        :text="item.text"
        :cssId="item.cssId"
        :valueToCopy="item.valueToCopy"
        @copied="showCheckConfirm"
        @savedEdit="saveEdit"
        @deleteItem="deleteItem"
      )
    div(v-else) Such emptiness. 
    AddMore(@saved="saveNewItem")
    
</template>

<script>
import AddMore from '@/components/AddMore.vue'
import CopyPaste from '@/components/CopyPasteItem.vue'
import { setStorage, fetchFromStorage } from '@/helpers/'
const keyOfStoredItems = 'storedCopies'

export default {
  name: 'App',
  components: {
    AddMore,
    CopyPaste,
    CheckMark: () => import('@/components/CheckMark.vue')
  },
  data(){
    return {
      isAddMoreOpen: false,
      storedCopyPastes: [],
      showCheckMark: false
    }
  },
  computed: {
    hasItemsStored(){
      return this.storedCopyPastes.length !== 0
    }
  },
  methods: {
    showCheckConfirm(){
      this.showCheckMark = true
      setTimeout(() => {
        this.showCheckMark = false
      }, 3000)
    },
    // to do- save items
    saveNewItem(newItem){
      const updatedArrayOfCopyPastes = [
        ...this.storedCopyPastes,
        newItem
      ]
      const newSaved = {
        [keyOfStoredItems]: updatedArrayOfCopyPastes
      }
      setStorage(newSaved)
      this.showCheckMark = true
      this.storedCopyPastes = updatedArrayOfCopyPastes
      setTimeout(() => {
        this.showCheckMark = false
      }, 3000)
    },
    saveEdit(newItem){
      const indexOfUpdatedItem = this.storedCopyPastes.findIndex(item => {
        return item.cssId === newItem.cssId
      })
      this.storedCopyPastes[indexOfUpdatedItem] = newItem
      this.updateItems([...this.storedCopyPastes])
      this.showCheckConfirm()
    },
    updateItems(updatedItems){
      this.storedCopyPastes = updatedItems
    },
    deleteItem(cssId){
      const updatedItems = this.storedCopyPastes.filter(item => {
        return item.cssId !== cssId
      })
      console.log('updated', updatedItems)
      const itemsWithoutDeletedOne = {
        [keyOfStoredItems]: updatedItems
      }
      setStorage(itemsWithoutDeletedOne)
      this.storedCopyPastes = updatedItems
      this.showCheckConfirm()
    }
  },
  async mounted(){
    if(process.env.NODE_ENV === 'production'){
      this.storedCopyPastes = await fetchFromStorage(keyOfStoredItems)
    } else {
      console.log('hey')
    }
  }
}
</script>

<style lang='sass'>
  @import '@/styles/index.sass'
  .header-container
    height: 30px

</style>
