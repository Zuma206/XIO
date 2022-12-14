import styles from "../styles/Error.module.scss";
import { useError } from "../xio";

export default () => {
    const [, closeError, errorData] = useError("");

    return errorData ? (
        <div className={styles.container} onClick={closeError}>
            <div className={styles.error} onClick={(e) => e.stopPropagation()}>
                <div className={styles.message}>
                    <div className={styles.title}>{errorData.title}</div>
                    <div>
                        {errorData.name}: {errorData.code}
                    </div>
                </div>
                <div>
                    <button className={styles.button} onClick={closeError}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};
