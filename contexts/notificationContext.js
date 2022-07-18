import { createContext, useState } from "react";

export const NotificationContext = createContext({
    notiCount: null, 
    setNotiCount: () => null, 
}); 

export const NotificationProvider = ({ children }) => {
    const [notiCount, setNotiCount] = useState(null);
    const value = { notiCount, setNotiCount };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}


    
