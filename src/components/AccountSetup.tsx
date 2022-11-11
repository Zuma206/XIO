import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/AccountSetup.module.scss";

export default () => {
    const [username, setUsername] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.title}>Pick a username!</div>
            <p>Please choose a unique username that:</p>
            <ul>
                <li>Is 16 characters or under</li>
                <li>Contains only letters and numbers</li>
            </ul>
            <input
                placeholder="Username"
                className={styles.text}
                maxLength={16}
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <p>
                By activating your account you agree to the{" "}
                <Link to="agreement">user agreement</Link>
            </p>
            <button
                onClick={() => {
                    console.log(username);
                }}
                className={styles.button}
            >
                Activate Account
            </button>
        </div>
    );
};