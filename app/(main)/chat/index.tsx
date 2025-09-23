import React, { useState } from 'react';
import { Text, View } from 'react-native';

// Get USERS 
export default function index() {

    const [users, setUsers] = useState([]); // -> Profiles

    return (
        <View>
            <Text>index</Text>
        </View>
    )
}