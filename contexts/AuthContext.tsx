import { User } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { createContext, useState } from "react";

interface AuthContextProps {
    user: User | null,
    login: (email: string, password: string) => Promise<boolean>,
    register: (user: User, password: string) => void
}


export const AuthContext = createContext({} as AuthContextProps);

const fakeDataSource = {
    users: [
        {
            email: "test@test.com",
            username: "test",
            name: "test",
            lastName: "test",
            age: 23
        },
    ],
    passwords: [
        {
            email: "test@test.com",
            password: "12345678"
        }
    ]
}

export const AuthProvider = ({ children }: any) => {

    // varibles
    // USER -> { email:string, password:string, name:string}
    const [user, setUser] = useState(null as any);

    // funciones

    const login = async (email: string, password: string) => {

        const response = await supabase.auth.signInWithPassword({ email, password });
        return false
    }

    const register = async (user: User, password: string) => {
        const response = await supabase.auth.signUp({ email: user.email, password });
    }

    return <AuthContext.Provider
        value={{
            user,
            login,
            register,
        }}
    >
        {children}
    </AuthContext.Provider>

}