import React from "react";
import styles from "./FondoSelectorSkeleton.module.css";

/**
 * SkeletonLoader for FondoManager component.
 * Displays animated placeholders while the fondos are loading.
 *
 * @returns {JSX.Element} Skeleton loader for fondos.
 */
export const FondoSkeletonLoader: React.FC = (): JSX.Element => {
    return (
        <div className={styles.skeletonItemContainer}>
            <div className={styles.skeletonHeader}></div>
            <div className={styles.skeletonList}>
                {Array.from({ length: 4 }).map(() => (
                    <div key={crypto.randomUUID()} className={styles.skeletonLine}></div>
                ))}
            </div>
        </div>
    );
};
