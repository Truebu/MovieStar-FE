import Swal from "sweetalert2";

import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, setError, startLoading } from "./ui";
import { handleErrorRegister } from "../helpers/handleErrorRegister";

/**
 * Login Process 
 */
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( async ({ user }) => {
        await dispatch( login( user.uid, user.displayName ) )
        dispatch(finishLoading())
      })
      .catch(({ message }) => {
        message = "Credenciales incorrectas"
        dispatch( setError(message) )
        dispatch(finishLoading());
      })
  }
}

export const singInWithGoogle = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( ({user}) => {
        dispatch( login(user.uid, user.displayName) )
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
      uid,
      displayName
    }
  }
)

/**
 * Register Process
 */

export const startRegisterEmailPassword = (email, password, name) => {
  return (dispatch) => {
    dispatch( startLoading() )
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async ({ user }) => {
        await user.updateProfile({displayName: name})
        dispatch( login(user.uid, user.displayName) )
        dispatch(finishLoading());
      })
      .catch((e) => {
        Swal.fire('Revisa tus credenciales', handleErrorRegister(e.message), 'error')
        dispatch(finishLoading());
      })
  }
}


/**
 * Logout Process
 */
 export const startLogout = () => {
  return async( dispatch ) => {
      await firebase.auth().signOut();
      dispatch( logout() );
  }
}

export const logout = () => ({
  type: types.logout
})
