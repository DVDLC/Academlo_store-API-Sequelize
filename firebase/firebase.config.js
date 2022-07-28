const { initializeApp } = require('firebase/app')
const { getStorage } = require('firebase/storage')

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STG_BUCKET,
    appId: process.env.FB_APP_ID
}

const firebase = initializeApp(firebaseConfig);
const storage = getStorage( firebase )

module.exports = {
    storage
}