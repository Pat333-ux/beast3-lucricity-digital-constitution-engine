import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
  DocumentData,
  WithFieldValue,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Fetch a single document by collection name and document ID.
 */
export async function getDocument<T = DocumentData>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as unknown as T;
  }
  return null;
}

/**
 * Fetch all documents in a collection with optional query constraints.
 */
export async function getCollection<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as unknown as T[];
}

/**
 * Create or overwrite a document in Firestore.
 */
export async function setDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: WithFieldValue<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data, { merge: true });
}

/**
 * Update specific fields in an existing document.
 */
export async function updateDocument(
  collectionName: string,
  id: string,
  data: Partial<DocumentData>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

/**
 * Delete a document from a collection by ID.
 */
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
