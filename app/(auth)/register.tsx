import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Link } from 'expo-router'

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleRegister = () => {
        const { name, email, password, confirmPassword } = formData
        
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos')
            return
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden')
            return
        }

        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres')
            return
        }

        // Aquí iría la lógica de registro
        Alert.alert('Éxito', 'Cuenta creada exitosamente')
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.content}>
                <Text style={styles.title}>Crear Cuenta</Text>
                <Text style={styles.subtitle}>Únete a nuestra comunidad</Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tu nombre completo"
                            value={formData.name}
                            onChangeText={(value) => handleInputChange('name', value)}
                            autoCapitalize="words"
                            autoComplete="name"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mínimo 6 caracteres"
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            secureTextEntry
                            autoComplete="new-password"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirmar contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Repite tu contraseña"
                            value={formData.confirmPassword}
                            onChangeText={(value) => handleInputChange('confirmPassword', value)}
                            secureTextEntry
                            autoComplete="new-password"
                        />
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <Text style={styles.loginLink}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        maxWidth: 400,
        alignSelf: 'center',
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 32,
    },
    form: {
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e1e8ed',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    registerButton: {
        backgroundColor: '#3498db',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#7f8c8d',
        fontSize: 14,
    },
    loginLink: {
        color: '#3498db',
        fontSize: 14,
        fontWeight: '600',
    },
})