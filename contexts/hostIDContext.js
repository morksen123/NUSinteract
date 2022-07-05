import { createContext, useState } from "react";

export const HostIDContext = createContext({
    hostID: '', 
    setHostID: () => '', 
}); 

export const HostIDProvider = ({ children }) => {
    const [hostID, setHostID] = useState('');
    const value = { hostID, setHostID };

    return <HostIDContext.Provider value={value}>{children}</HostIDContext.Provider>
}


    
