import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import { colors } from './src/global/styles';
import RootNavigator from './src/navigation/RootNavigatior';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AuthContext from './src/contexts/AuthContext';
import firestore from '@react-native-firebase/firestore';

export default function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    // Xử lý thay đổi trạng thái người dùng
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe khi component unmount
    }, []);

    const login = (email: string, password: string) => {
        console.log('Login function called with email:', email);
        auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log('User signed in:', response.user.email);
                const user = response.user;
                if (user.email) {
                    firestore().collection('USERS').doc(user.email).get()
                        .then(documentSnapshot => {
                            if (documentSnapshot.exists) {
                                console.log('User data found:', documentSnapshot.data());
                                setUser(user);
                            } else {
                                Alert.alert('Error', 'User data not found');
                            }
                        });
                } else {
                    Alert.alert('Error', 'User email is null');
                }
            })
            .catch(e => {
                console.error('Login error:', e);
                Alert.alert('Email hoặc mật khẩu không chính xác');
            });
    };

    if (initializing) return null;

    return (
        <AuthContext.Provider value={{ user, setUser, login }}>
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.statusbar}
                />
                <RootNavigator />
            </View>
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});