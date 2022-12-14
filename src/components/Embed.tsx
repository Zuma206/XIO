import { RefObject, useEffect, useState } from "react";
import styles from "../styles/Embed.module.scss";
import { useXIOUser, XIOUser } from "../xio";
import { fetchAPI } from "../xio/api";
import YoutubePlayer from "./YoutubePlayer";

interface props {
    src: string;
    scroll: boolean;
    scrollDirection: "up" | "down";
    end: RefObject<HTMLDivElement>;
}

export default ({ src, scroll, scrollDirection, end }: props) => {
    const [validLink, setValidLink] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [user] = useXIOUser();

    const youtubeRegEx =
        /https?:\/\/(www\.)?(youtube.com\/watch\?v\=)|(youtu.be\/)[A-Za-z0-9_-]{11}/;
    const isYoutube = youtubeRegEx.test(src);

    async function checkImage(user: XIOUser) {
        const authToken = await user.googleUser.getIdToken();
        const { result } = await fetchAPI("api/image", authToken, { url: src });
        setValidLink(result);
    }

    useEffect(() => {
        if (isYoutube) {
            setValidLink(true);
        } else if (user != "known" && user != "unknown") {
            checkImage(user);
        }
    }, []);

    return validLink ? (
        <div
            className={styles.embed}
            style={{ display: hasLoaded ? "block" : "none" }}
        >
            {isYoutube ? (
                <YoutubePlayer
                    src={src}
                    scroll={scroll}
                    setHasLoaded={setHasLoaded}
                    scrollDirection={scrollDirection}
                    end={end}
                />
            ) : (
                <img
                    className={styles.image}
                    src={`https://external-content.duckduckgo.com/iu/?u=${encodeURIComponent(
                        src
                    )}`}
                    onLoad={() => {
                        setHasLoaded(true);
                        if (
                            !scroll ||
                            scrollDirection != "down" ||
                            !end.current
                        )
                            return;
                        const endDiv = end.current;
                        setTimeout(() => endDiv.scrollIntoView(), 0);
                    }}
                />
            )}
        </div>
    ) : null;
};
