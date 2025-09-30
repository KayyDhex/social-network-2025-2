import { DataContext } from '@/contexts/DataContext';
import { User } from '@/types/common.type';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function index() {

    const { getUsers, getChats } = useContext(DataContext)
    const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        initiUsers();
        initChats();
    }, []);

    const initiUsers = async () => {
        setIsLoading(true)
        try {
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const initChats = async () => {
        setIsLoading(true)
        try {
            const response = await getChats();
            setChats(response);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    return (
        <View
            style={{
                padding: 20
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}
            >
                USERS
            </Text>
            {
                users?.map((value, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            gap: 5,
                            marginVertical: 10
                        }}
                        onPress={() => router.push("/(main)/chats")}
                    >
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 100
                            }}
                            source={value.avatar_url}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={1000}
                        />
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16
                            }}
                        >
                            {value.name}
                        </Text>
                    </TouchableOpacity>
                ))
            }
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}
            >
                CHATS
            </Text>
            {
                chats.map((value, index) => <TouchableOpacity
                    key={index}
                    style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        gap: 5,
                        marginVertical: 10
                    }}
                    onPress={() => router.push({
                        pathname: "/(main)/chats/chat/[id]",
                        params: { id: value.id },
                    })}
                >
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100
                        }}
                        source={value.avatar_url}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 16
                        }}
                    >
                        {value.name}
                    </Text>
                </TouchableOpacity>)
            }
        </View>
    )
}