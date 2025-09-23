import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from '@react-native-firebase/firestore';
import { WEB_CLIENT_ID } from '@env';

// Initialize Firebase services
const auth = getAuth();
const firestore = getFirestore();
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});
console.log(WEB_CLIENT_ID);
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.getTokens();
    if (!idToken) {
      throw new Error('Google Sign-In failed: No ID Token received.');
    }
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    console.error('Google Sign-In error:', error);
    throw error;
  }
};


export const signOutUser = async () => {
  try {
    await GoogleSignin.signOut();
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};


export const onAuthStateChangedListener = (callback: Function): Function => {
  return onAuthStateChanged(auth, callback);
};


export const saveEconomyToFirestore = async (userId: string, coins: number, XP: number) => {
  const userRef = doc(firestore, 'users', userId);
  await setDoc(userRef, { coins, XP }, { merge: true });
};


export const loadEconomyFromFirestore = async (userId: string): Promise<object | null> => {
  const userRef = doc(firestore, 'users', userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists) {
    return docSnap.data() || null;
  }
  return null;
};
