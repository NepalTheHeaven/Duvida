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
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebaseConfig';

const ACCIDENTS = 'accidents';

/* ---------------- Auth ---------------- */
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email.trim(), password);

export const register = async (name, email, password) => {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (name) await updateProfile(cred.user, { displayName: name });
  return cred;
};

export const logout = () => signOut(auth);

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
