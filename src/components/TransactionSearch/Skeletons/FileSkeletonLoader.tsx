import React from "react";
import styles from "./styles/FileSkeletonLoader.module.css";

/**
 * SkeletonLoader component for displaying a loading animation.
 * It simulates the loading of card content with multiple animated divs.
 *
 * @returns {JSX.Element} Skeleton loader component.
 */
export const SkeletonLoader: React.FC = (): JSX.Element => {
    return (
        <div className={styles.skeletonLoaderContainer}>
            <div className={styles.skeletonHeader}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
        </div>
    );
};
