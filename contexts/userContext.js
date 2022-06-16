import { createContext, useState, useEffect } from "react";

import { supabase } from "../utils/supabase";

export const UserContext = createContext({
    user: null, 
    setUser: () => null, 
}); 

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const value = { user, setUser };

    useEffect(() => {
        const session = supabase.auth.session(); 
        session ? setUser(session.user) : setUser(null)
    
        const { data: authListender } = supabase.auth.onAuthStateChange(
            (session) => {
                session ? setUser(session.user) : null; 
            })
    
            return () => {
                authListender.unsubscribe();
            }
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


    
