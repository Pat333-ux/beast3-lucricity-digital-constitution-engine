import { db } from "./config";
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
  orderBy,
  limit,
} from "firebase/firestore";

export interface MemberProfile {
  id: string;
  email: string;
  fullName: string;
  role: "member" | "administrator" | "auditor";
  location: {
    state: string;
    county: string;
    city: string;
    zipCode: string;
  };
  householdSize: number;
  annualIncome: number;
  veteranStatus: boolean;
  disabilityStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export const dbService = {
  // Member Operations
  async getMember(id: string): Promise<MemberProfile | null> {
    try {
      const docRef = doc(db, "members", id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as MemberProfile) : null;
    } catch (error) {
      console.error("Error fetching member from Firestore:", error);
      throw new Error("Failed to retrieve member record");
    }
  },

  async createMember(member: MemberProfile): Promise<void> {
    try {
      const docRef = doc(db, "members", member.id);
      await setDoc(docRef, member);
    } catch (error) {
      console.error("Error creating member in Firestore:", error);
      throw new Error("Failed to save member record");
    }
  },

  async updateMember(id: string, data: Partial<MemberProfile>): Promise<void> {
    try {
      const docRef = doc(db, "members", id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating member in Firestore:", error);
      throw new Error("Failed to update member record");
    }
  },

  async deleteMember(id: string): Promise<void> {
    try {
      const docRef = doc(db, "members", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting member from Firestore:", error);
      throw new Error("Failed to delete member record");
    }
  },

  // General Collection Helper
  async getCollectionData(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    } catch (error) {
      console.error(`Error fetching collection ${collectionName}:`, error);
      throw new Error(`Failed to retrieve ${collectionName} data`);
    }
  },
};
