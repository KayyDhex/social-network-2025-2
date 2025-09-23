import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ImageModalProps {
    isVisible: boolean;
}

export default function ImageModal({
    isVisible
}: ImageModalProps) {

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
        >
            <View style={styles.container}>
                {
                    permission?.granted ?
                        <>
                            <CameraView style={styles.camera} facing={facing} />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => setFacing(prev => prev == "back" ? 'front' : 'back')}>
                                    <Text style={styles.text}>Flip Camera</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <>
                            <Text style={styles.message}>We need your permission to show the camera</Text>
                            <Button onPress={requestPermission} title="grant permission" />
                        </>
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});