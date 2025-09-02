import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function EntryPoint() {

    // sugar sintax vs normal sintax
    // <View></View>  vs
    // React.createElement(View, props, children)

    return <View
        style={styles.container}
    >
        {/* Logo */}
        {/* <Image /> */}

        {/* Descripcion */}
        <Text
            style={styles.text}
        >
            Hello, world!
        </Text>
        {/* Inputs */}
        <TextInput />
        <TextInput />
        {/* Buttons */}
        <TouchableOpacity
            onPress={() => { }}
        >

        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    }
})

// Components


// nuestraapp/