import { useState, useEffect } from 'react';
import { projectStorage,projectFirestore,timestamp} from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(projectStorage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL);

        // Save the URL to Firestore (optional)
        const firestore = getFirestore();
        const collectionRef = collection(firestore, 'images');
        const createdAt = serverTimestamp();
        const docRef = await addDoc(collectionRef, { url: downloadURL,createdAt });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
