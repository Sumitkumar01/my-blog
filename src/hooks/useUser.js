import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect (() => {
        const unSubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setLoading(false);
        })
        return unSubscribe;
    },[]);
  return { useUser, isLoading };
}
