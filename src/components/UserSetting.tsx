import {
    blacklistUser,
    useError,
    UserResult,
    useXIOUser,
    whitelistUser,
} from "../xio";
import styles from "../styles/UserSetting.module.scss";
import { Dispatch, SetStateAction } from "react";
import { CachedUserHook } from "../xio/userCache";

type props = {
    member: string;
    useCachedUser: CachedUserHook;
    setLoading: Dispatch<SetStateAction<boolean>>;
    channelId: string;
    fetchChannelData: () => void;
    blacklisted: boolean;
    showButton: boolean;
    isOwner: boolean;
};

export default ({
    member,
    useCachedUser,
    setLoading,
    channelId,
    fetchChannelData,
    blacklisted,
    showButton,
    isOwner,
}: props) => {
    const [user] = useXIOUser();
    const userData = useCachedUser(member);
    const [displayError] = useError("Uh oh!");

    return (
        <div className={styles.user} key={member}>
            <div className={styles.left}>
                {userData?.gravatar ? (
                    <img
                        className={styles.picture}
                        src={userData.gravatar}
                        alt={member}
                    />
                ) : null}
                {userData?.username ?? "Loading..."} {isOwner ? "👑" : null}
            </div>
            <div className={styles.right}>
                {showButton ? (
                    <button
                        className={styles.button}
                        onClick={async () => {
                            if (user == "known" || user == "unknown") return;
                            setLoading(true);
                            const action = blacklisted
                                ? whitelistUser
                                : blacklistUser;
                            const err = await action(
                                member,
                                channelId,
                                await user.googleUser.getIdToken()
                            );
                            if (err) {
                                displayError({
                                    name: "User admin error",
                                    code: err.response,
                                    message: "",
                                });
                            } else {
                                await fetchChannelData();
                            }
                            setLoading(false);
                        }}
                    >
                        {blacklisted ? "Whitelist" : "Blacklist"}
                    </button>
                ) : null}
            </div>
        </div>
    );
};
