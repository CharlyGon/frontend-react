import React from "react";
import styles from "./DetailsSkeletonLoader.module.css";

/**
 * SkeletonLoader for TransactionDetails component.
 * Displays animated placeholders while the transaction details are loading.
 *
 * @returns {JSX.Element} Skeleton loader for transaction details.
 */
const TransactionDetailsSkeleton: React.FC = (): JSX.Element => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.skeletonHeader}></div>
            <div className={styles.skeletonContent}>
                {Array.from({ length: 14 }).map(() => {
                    const uniqueId = Math.random().toString(36).substring(2, 11);
                    return (
                        <div key={`skeleton-${uniqueId}`} className={styles.skeletonLine}></div>
                    );
                })}
            </div>
        </div>
    );
};

export default TransactionDetailsSkeleton;
