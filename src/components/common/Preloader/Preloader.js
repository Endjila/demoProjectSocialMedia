import React from "react";
import preloader from "../../../assets/images/loading.gif";
import styles from "./Preloader.module.css"

const Preloader = (props) => {
    return (
        <div className={styles.wrapper}>
            <img src={preloader}/>
        </div>
    )
}

export default Preloader;