import React from "react";
import styles from "./ListTransactionSkeleton.module.css";

/**
 * SkeletonLoader for TransactionList component.
 * Displays animated placeholders while the list of transactions is loading.
 *
 * @returns {JSX.Element} Skeleton loader for transaction list.
 */
export const ListSkeletonOperation: React.FC = (): JSX.Element => {
    return (
        <div>
            {/* Skeleton for header */}
            <div className={styles.skeletonHeader}></div>

            {/* Skeleton for list items */}
            {Array.from({ length: 5 }).map(() => {
                const uniqueId = Math.random().toString(36).substring(2, 11);
                return (
                    <div key={`skeleton-${uniqueId}`} className={styles.skeletonItem}></div>
                );
            })}
        </div>
    );
};
