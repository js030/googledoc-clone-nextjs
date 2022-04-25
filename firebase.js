/** @format */
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCKSvap5TLyDhGYVzGxuV5MBRs43Rh5uFU',
	authDomain: 'doc-clone-d6d90.firebaseapp.com',
	projectId: 'doc-clone-d6d90',
	storageBucket: 'doc-clone-d6d90.appspot.com',
	messagingSenderId: '936718319633',
	appId: '1:936718319633:web:34052d5e050ae732a231b0',
	measurementId: 'G-5J887YYMBQ',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
