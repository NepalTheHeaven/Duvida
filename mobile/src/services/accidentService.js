// Thin service layer over Firebase so screens stay clean.
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebaseConfig';

const ACCIDENTS = 'accidents';
const USERS = 'users';

/* ---------------- Auth ---------------- */

const AUTH_ERRORS = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Contact your administrator.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/too-many-requests': 'Too many failed attempts. Try again later.',
};

const mapAuthError = (err) => {
  const message = AUTH_ERRORS[err.code];
  throw message ? new Error(message) : err;
};

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email.trim(), password).catch(mapAuthError);

export const register = async (name, email, password, role = 'officer') => {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password).catch(mapAuthError);
  if (name) await updateProfile(cred.user, { displayName: name.trim() });
  await setDoc(doc(db, USERS, cred.user.uid), {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    createdAt: serverTimestamp(),
  });
  return cred;
};

export const logout = () => signOut(auth);

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, USERS, uid));
  return snap.exists() ? snap.data() : null;
};

/* ---------------- Photos ---------------- */
// uri -> Firebase Storage download URL
export const uploadPhoto = async (uri) => {
  const res = await fetch(uri);
  const blob = await res.blob();
  const path = `accident-photos/${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
};

/* ---------------- Accidents ---------------- */
// Generates a friendly report id like ACC-2025-000128
const makeReportId = (n) => `ACC-${new Date().getFullYear()}-${String(n).padStart(6, '0')}`;

export const submitAccident = async (data) => {
  // Upload any local photo URIs first.
  let photoUrls = [];
  if (data.photos?.length) {
    photoUrls = await Promise.all(
      data.photos.map((p) => (p?.startsWith('http') ? Promise.resolve(p) : uploadPhoto(p)))
    );
  }
  const user = auth.currentUser;
  const reportId = makeReportId(Math.floor(100000 + Math.random() * 900000));
  const payload = {
    reportId,
    accidentType: data.accidentType || 'Collision',
    severity: data.severity || 'minor',
    location: data.location || null,           // { name, lat, lng }
    occurredAt: data.occurredAt
      ? Timestamp.fromDate(new Date(data.occurredAt))
      : serverTimestamp(),
    vehiclesInvolved: data.vehiclesInvolved ?? 1,
    roadCondition: data.roadCondition || 'Normal',
    weatherCondition: data.weatherCondition || 'Clear',
    description: data.description || '',
    photos: photoUrls,
    reportedBy: user?.displayName || user?.email || 'Unknown Officer',
    reportedByUid: user?.uid || null,
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, ACCIDENTS), payload);
  return reportId;
};

export const fetchRecentAccidents = async (count = 10) => {
  const q = query(collection(db, ACCIDENTS), orderBy('createdAt', 'desc'), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
