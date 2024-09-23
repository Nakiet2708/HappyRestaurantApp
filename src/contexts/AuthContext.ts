import { createContext } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextType {
    user: FirebaseAuthTypes.User | null;
    setUser: (user: FirebaseAuthTypes.User | null) => void;
    login: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    login: () => {},
});

export default AuthContext;