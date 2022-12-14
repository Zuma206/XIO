import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type UserStatus = "unknown" | "known";
export type ActivationStatus = "unknown" | "activated" | "unactivated";

export interface XIOUser {
    googleUser: User;
    activated: ActivationStatus;
    username: string | null;
    gravatar: string | null;
}

// Type that represents a state array for User|null
export type AuthState = [
    XIOUser | UserStatus,
    Dispatch<SetStateAction<XIOUser | UserStatus>>
];

// Create an AuthContext for storing user data
export const AuthContext = createContext<AuthState>(["unknown", () => {}]);

// Create a hook-like function to returns the user data from the context
export const useAuth = () => useContext(AuthContext)[0];
export const useXIOUser = (): [
    XIOUser | UserStatus,
    (username: string, gravatar: string) => void,
    (activated: ActivationStatus) => void
] => {
    const [auth, setAuth] = useContext(AuthContext);
    return [
        auth,
        (username: string, gravatar: string) => {
            setAuth((userData: XIOUser | UserStatus): XIOUser | UserStatus => {
                if (typeof userData != "string") {
                    return {
                        ...userData,
                        username,
                        gravatar,
                        activated: "activated",
                    };
                }
                return userData;
            });
        },
        (activated: ActivationStatus) => {
            setAuth((userData: XIOUser | UserStatus): XIOUser | UserStatus => {
                if (typeof userData == "string") return userData;
                return { ...userData, activated: activated };
            });
        },
    ];
};
