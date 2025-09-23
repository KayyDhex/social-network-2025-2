import React, { useState } from 'react';
import { Text, View } from 'react-native';



interface Media {
    url: string,
    type: 'image' | 'video' | 'document' | 'audio',
}

interface Message {
    text: string,
    createAt: Date,
    seenAt: Date,
    sentAt: Date,
    sentBy: string,
    media: Media[],
    chatId: string // UUID CHAT
}

interface Chats {
    id: string,
    userId1: string,
    userId2: string,
    message: Message[]
}



export default function Chat() {

    const [messages, setMessages] = useState([]); // History

    return (
        <View>
            <Text>chat</Text>
        </View>
    )
}