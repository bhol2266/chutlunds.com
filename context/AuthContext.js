import { createContext, useContext, useState } from "react";
const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [LoginModalVisible, setLoginModalVisible] = useState(false);


    return (
        <AuthContext.Provider value={{ user, setUser,LoginModalVisible, setLoginModalVisible }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
