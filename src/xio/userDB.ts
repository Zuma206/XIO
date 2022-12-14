import { useEffect, useState } from "react";
import { fetchAPI } from "./api";

export type UserResult = {
    username: string;
    gravatar: string;
    channels: string[];
    key: string;
    dev: boolean;
};

export const getUserById = async (uid: string, authToken: string) => {
    const res = await fetch(location.origin + "/api/users/" + uid, {
        headers: { "X-Token": authToken },
    });
    const { result } = await res.json();
    return result as UserResult;
};

export const createUser = async (username: string, authToken: string) => {
    const { error } = await fetchAPI(
        location.origin + "/api/users/activate",
        authToken,
        {
            username,
        }
    );
    return error;
};
