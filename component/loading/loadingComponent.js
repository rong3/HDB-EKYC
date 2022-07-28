import React from "react";
import styles from "./Loading.module.css";

function Loading(props) {
    return (
        <div className={props.loading ? styles.body_loading : styles.none}>
            <div className={styles.lds_ellipsis}>
                <img src="/asset/image/loading.gif" />
            </div>
        </div>
    );
}

export default Loading;