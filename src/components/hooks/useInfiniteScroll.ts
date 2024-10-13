import { useCallback, useEffect } from "react";
import { UseInfiniteScrollProps } from "../../interfaces/interfaces";

/**
 * Custom hook for infinite scrolling behavior.
 * Attaches a scroll event listener to a container and triggers
 * the loadMore function when the user scrolls near the bottom.
 *
 * @param {UseInfiniteScrollProps} props - The props for infinite scrolling:
 *   - containerRef: Reference to the scrolling container.
 *   - loadMore: Function to call when more data should be loaded.
 *   - hasMore: Boolean indicating if more data is available.
 *   - loading: Boolean indicating if data is currently being loaded.
 *   - offset: Distance from the bottom of the container to trigger loading more (default is 5px).
 */
export const useInfiniteScroll = ({
    containerRef,
    loadMore,
    hasMore,
    loading,
    offset = 5
}: UseInfiniteScrollProps) => {

    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - offset && hasMore && !loading) {
                loadMore();
            }
        }
    }, [containerRef, hasMore, loading, offset, loadMore]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [containerRef, handleScroll]);
};
