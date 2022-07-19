import { createContext, useState } from "react";

export const RequestContext = createContext({
    numRequests: 0, 
    requestsData: [],
    setRequestsData: () => []
}); 

export const RequestProvider = ({ children }) => {
    const [numRequests, setNumRequests] = useState(0);
    const [requestsData, setRequestsData] = useState([])

    const value = { 
        numRequests,
        setNumRequests,
        requestsData,
        setRequestsData 
    };

    return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
}


    
