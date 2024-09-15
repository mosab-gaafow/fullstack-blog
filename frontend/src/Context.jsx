//  context-api waa inaa helnaa variable wareegaya oo gaaraya dhamaan application-keena

import { createContext, useContext, useState } from "react"
// AuthContext wa kan la isticmaali lahaa.
export const AuthContext = createContext(); 

// meeshi mel walba laga dhihi lhaa createcontext asagaa si automatically ah auso import garenayo oo aan isticmaalena.

export const useAuth = ()  => {
    //  useContext: aan isticmaali jirnay waye wuu noso import garenaa
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    // dad-ka appkeena quudinaayay oo gaarsinayay
    const [currentUser, setCurrentUser] = useState(null);

    const value = {
        currentUser,
        setCurrentUser
    };

    return <AuthContext.Provider value={value}>
        {/* children: waxaa access u heelayo dhaman 2daan value application-keena oo dhan */}
        {children}
    </AuthContext.Provider>
}

