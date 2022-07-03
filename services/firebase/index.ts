import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC-halbd4O69Yyu_FDrYLVHRzRYHJZa4ng',
  authDomain: 'guru-academy-297d3.firebaseapp.com',
  projectId: 'guru-academy-297d3',
  storageBucket: 'guru-academy-297d3.appspot.com',
  messagingSenderId: '583838759969',
  appId: '1:583838759969:web:2bef7a047909d14285f760',
  measurementId: 'G-7RS7R812QC',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
