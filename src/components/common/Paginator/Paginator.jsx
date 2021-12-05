import React, { useState } from "react";
import styles from "./Paginator.module.css"


let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionPagesSize = 15;
    let portionCount = Math.ceil(pagesCount / portionPagesSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionPagesSize + 1;
    let rigthPortionPageNumber = portionNumber * portionPagesSize;

    return (
        <div className={styles.paginationWrapper}> 
            <ul className={styles.pagination}>
                <div className={styles.darkPagination}>
                <li> 
                    {portionNumber > 1 &&
                        <a href="#" className={styles.prev} onClick={() => { setPortionNumber(portionNumber - 1) }}>{"<<<"}</a>}
                </li>
                <li>
                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rigthPortionPageNumber)
                        .map((p) => {
                            return <a href="#" className={props.currentPage === p && styles.selectedPage}
                                onClick={() => {
                                    props.onPageChanged(p)
                                }}> {p} </a>
                        })}
                </li>
                <li>
                    {portionCount > portionNumber &&
                        <a href="#" className={styles.next} onClick={() => { setPortionNumber(portionNumber + 1) }}>{">>>"}</a>}
                </li>
                </div>
            </ul>
        </div>
    )
}

export default Paginator;