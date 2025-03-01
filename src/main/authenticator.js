import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, getAdditionalUserInfo, reload, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from "../firebase"
import { doc, getDocs, getDoc, setDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import taskManager from './taskManager';

class Authenticator {
    constructor() {
        onAuthStateChanged(auth, (user) => {
            if (user) this.tasksCollection = collection(db, `users/${user.uid}/tasks`)
        })
    }

    getDeadlineDoc(user, id) {
        return doc(db, `users/${user.uid}/tasks/${id}`)
    }

    getUserinfoDoc(user) {
        return doc(db, `users/${user.uid}`)
    }

    getFriendsCollection(user) {
        return collection(db, `users/${user.uid}/friends`)
    }

    registerUser(email, password, username, errorFunc = null, successFunc = null) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                this.addUserInfo(username, (result) => successFunc(result))
            })
            .catch((error) => this.handleError(error, errorFunc))
        }

    addUserInfo(displayName, callback) {
        updateProfile(auth.currentUser, {
            displayName: displayName
        }).then((user) => callback(user))
    }

    signIn(email, password, errorFunc = null, successFunc = null) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                successFunc(user)
            })
            .catch((error) => this.handleError(error, errorFunc))
    }

    logout() {
        signOut(auth)
    }

    addDeadline(category, date, from, to, taskSpec, errorFunc, successFunc) {
        addDoc(this.tasksCollection, {
            category: category,
            date: date,
            from: from,
            to: to,
            taskSpec: taskSpec,
            value: taskManager.calculateValue(from, to),
            finished: false
        }).then((docRef) => successFunc(docRef.id))
        .catch((error) => errorFunc(error.message))
    }

    fetchDeadlines(errorFunc, successFunc) {
        getDocs(this.tasksCollection).then((data) => successFunc(data.docs))
        .catch((error) => errorFunc(error.message))
    }

    updateDeadline(taskId, change) {
        updateDoc(this.getDeadlineDoc(auth.currentUser, taskId), change)
    }

    updateUser(change, success, error) {
        updateProfile(auth.currentUser, change).then(() => {
            reload(auth.currentUser).then(() => success(auth.currentUser))
        }).catch((error) => error(error.message))
    }

    updateScore(by) {
        const userInfoDoc = this.getUserinfoDoc(auth.currentUser)
        getDoc(userInfoDoc).then((doc) => {
            const prevScore = (doc.exists() ? doc.data()['score'] : 0)
            setDoc(userInfoDoc, {
                score: prevScore + by
            }, { merge: true })
        })
    }

    fetchScore(success) {
        const userInfoDoc = this.getUserinfoDoc(auth.currentUser)
        getDoc(userInfoDoc).then((doc) => {
            if (doc.exists()) {
                success(doc.get("score"))
            }
        })
    }

    fetchFriends(success) {
        const friendsCol = this.getFriendsCollection(auth.currentUser)
        getDocs(friendsCol).then((docs) => {
            docs.docs.map((doc) => {
                return doc.data()
            })
        })
    }

    resetPassword(email, error, success) {
        sendPasswordResetEmail(auth, email).then(() => success()).catch((errorResponse) => error(errorResponse.message))
    }

    getLoginStatus(callback = null) {
        const user = auth.currentUser
        const result = user != null
        if (result && callback) callback()
        return result
    }
        
    handleError(error, callback = null) {    
        const errorCode = error.code
        const errorMessage = error.message
        if (callback) callback(errorMessage)
    }
}

export default new Authenticator()