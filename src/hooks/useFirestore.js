import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // Updated import paths.
import { projectFirestore } from '../firebase/config';

const useFirestore = (collectionName) => { // Change the parameter name from "collection" to "collectionName" to avoid conflicts.
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(collection(projectFirestore, collectionName), orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
    // This is a cleanup function that React will run when
    // a component using the hook unmounts.
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
