export const setStorage = objectToStore => {
  try {
    chrome.storage.sync.set(objectToStore, () => {
      console.log('done')
    })
  } catch(error){
    console.error('error in setting', error)
  }
}

export const fetchFromStorage = key => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get([key], value => {
        console.log('value from storage', value)
        if(value[key]){
          return resolve(value[key])
        } else {
          return resolve([])
        }
      })
    } catch(error){
      return reject({
        message: error
      })
    }
  })
}