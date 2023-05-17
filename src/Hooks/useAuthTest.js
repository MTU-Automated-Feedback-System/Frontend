import { Amplify, Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AwsConfigAuth } from "../config/auth";

Amplify.configure({ Auth: AwsConfigAuth });

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage("auth", false);
    const [username, setUsername] = useLocalStorage("username", "");

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((result) => {
                setUsername(result.username);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
                setUsername("");
                setIsAuthenticated(false);
                setIsLoading(false);
            });
    }, []);

    const signIn = async (username, password) => {
        try {
            const result = await Auth.signIn(username, password);
            setUsername(result.username);
            setIsAuthenticated(true);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGIN FAIL",
            };
        }
    };

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUsername("");
            setIsAuthenticated(false);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGOUT FAIL",
            };
        }
    };

    return {
        isLoading,
        isAuthenticated,
        username,
        signIn,
        signOut,
    };
};