import React from 'react';
import styles from './LogsSkeleton.module.css';

const LogsSkeletonLoader: React.FC = () => {
    return (
        <div className={styles.skeletonWrapper}>
            {Array.from({ length: 10 }).map((_, index) => {
                const uniqueId = `skeleton-${index}-${Math.random().toString(36).substring(2, 11)}`;
                return (
                    <div key={uniqueId} className={styles.skeletonLog}></div>
                );
            })}
        </div>
    );
};

export default LogsSkeletonLoader;
