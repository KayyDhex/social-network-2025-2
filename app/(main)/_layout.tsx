import { DataProvider } from '@/contexts/DataContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function LayoutMain() {
    return <DataProvider>
        <Tabs
            screenOptions={{
                headerShown: false
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="message" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="new-post"
                options={{
                    title: "Post",
                    tabBarIcon: ({ color, size, focused }) => <FontAwesome name="user" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="reels"
                options={{
                    title: "Reels",
                    tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name="movie-settings" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size, focused }) => <FontAwesome name="user" size={size} color={color} />
                }}
            />
        </Tabs>
    </DataProvider>
}