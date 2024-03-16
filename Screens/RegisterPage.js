import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
//import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
//import { initializeApp } from 'firebase/app';
//import  {firebaseConfig}  from '../Components/firebase-config';

// Инициализация Firebase
//initializeApp(firebaseConfig);

// Получение экземпляра Auth
//const auth = getAuth();

import Logo from '../assets/LOGO.jpeg';

const RegisterPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // Для отображения ошибок

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSignUp = async () => {
        let isValid = true;
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
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
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('User registered successfully');
                // Перенаправление на страницу входа или другую страницу после успешной регистрации
                navigation.navigate('Login');
            } catch (error) {
                console.error(error);
                Alert.alert("Registration Error", error.message);
            }
        } else {
            Alert.alert("Validation Error", Object.values(newErrors).join('\n'));
        }

        setErrors(newErrors);
    };

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#999"
                onChangeText={setName}
                value={name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                Already have an account?
                <Text style={styles.footerButton} onPress={() => navigation.navigate('Login')}> Login</Text>
            </Text>
        </View>
    );
};



// Ваши стили остаются без изменений


const styles = StyleSheet.create({

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
        width: 340, // Размер логотипа можно настроить
        height: 340, // в зависимости от твоих нужд
        resizeMode: 'contain', // Чтобы изображение не искажалось
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        color: 'white',
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
        backgroundColor: '#ADD8E6', // светло-голубой цвет
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 30, // овальная форма
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'IrishGrover-Regular',
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

export default RegisterPage;
