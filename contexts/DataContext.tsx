import { User } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface DataContextProps {
    getUsers: () => Promise<User[]>,
    getChats: () => Promise<any[]>
}

export const DataContext = createContext({} as DataContextProps);

export const DataProvider = ({ children }: any) => {

    const { user } = useContext(AuthContext);
    const [chats, setChats] = useState([]);

    // functions

    useEffect(() => {
        getChats()
    }, [])

    const getUsers = async () => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")

            if (!error) {
                return data
            }

        } catch (error) {
            console.log({
                error
            })
        }
        return []
    }

    const getChats = async () => {
        try {
            const id = (await supabase.auth.getUser()).data.user?.id

            const { data, error } = await supabase
                .from("chats")
                .select("*, user:user_id(*), user1:user_id2(*),messages(*)") // Check this query
                .eq("user_id_1", id);

            if (!error) {
                setChats(data as any);
                return data
            }

        } catch (error) {
            console.log({
                error
            })
        }
        return []
    }

    return <DataContext.Provider
        value={{
            getUsers,
            getChats
        }}
    >
        {children}
    </DataContext.Provider>
}