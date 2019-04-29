import { firebase } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useFirebaseAuth() {
  const { initialising, user } = useAuthState(firebase.auth());
  const isAuthed = user !== null;
  return { initialising, isAuthed, user };
}

export function loginWithGoogle() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider);
}
