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
                {Array.from({ length: 4 }).map((_, index) => {
                    const uniqueId = `skeleton-${index}-${Math.random().toString(36).substring(2, 11)}`;
                    return (
                        <div key={uniqueId} className={styles.skeletonLine}></div>
                    );
                })}
            </div>
        </div>
    );
};
