import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
//import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
//import { initializeApp } from 'firebase/app';
//import { firebaseConfig } from '../Components/firebase-config';

// Инициализация Firebase
//const app = initializeApp(firebaseConfig);

// Получение экземпляра Auth
//const auth = getAuth(app);
import Logo from '../assets/LOGO.jpeg'

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = async () => {
        let isValid = true;
        let newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (isValid) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('User logged in');
                navigation.navigate('MainPage'); // Переход на MainPage после успешного входа
            } catch (error) {
                console.error(error);
                Alert.alert("Login Error", error.message);
                // Добавьте здесь обработку ошибок Firebase, если необходимо
            }
        } else {
            Alert.alert("Validation Error", Object.values(newErrors).join('\n'));
        }

        setErrors(newErrors);
    };
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
            />
            <TextInput
                style={styles.input}
                placeholder="E-Mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                Don't have an account?
                <Text style={styles.footerButton} onPress={() => navigation.navigate('Register')}> Sign Up</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    // Переиспользуем стили из RegisterPage.js

    errorText: {
        color: 'red', // Цвет текста ошибки
        marginBottom: 10, // Отступ снизу
    },

    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 340,
        height: 340,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    input: {
        width: '60%',
        backgroundColor: 'lightgray',
        padding: 17,
        borderRadius: 30,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'IrishGrover-Regular', // Используем тот же шрифт, что и в RegisterPage
    },
    footerText: {
        color: 'white',
        marginTop: 20,
    },
    footerButton: {
        color: '#ADD8E6',
        fontWeight: 'bold',
    },
});

export default LoginPage;