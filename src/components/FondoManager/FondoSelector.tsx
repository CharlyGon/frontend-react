import React, { useRef } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { FondoSelectorProps } from "../../interfaces/interfaces";

/**
 * Component for selecting a fondo from a list.
 * Displays a dropdown menu that allows the user to select a fondo by its identifier.
 *
 * @param {FondoSelectorProps} props - The props for the fondo selector component:
 *   - fondos: List of fondos to display.
 *   - onSelect: Callback function to handle fondo selection.
 *   - selectedFondo: The currently selected fondo (optional).
 *   - loadMoreFondos: Function to load more fondos on scroll.
 *   - hasMoreFondos: Boolean indicating if there are more fondos to load.
 *   - loadingFondos: Boolean indicating whether fondos are being loaded.
 * @returns {JSX.Element} The fondo selector component.
 */
const FondoSelector: React.FC<FondoSelectorProps> = ({
    fondos,
    onSelect,
    selectedFondo,
    loadMoreFondos,
    hasMoreFondos,
    loadingFondos,
}: FondoSelectorProps): JSX.Element => {
    const dropdownRef = useRef<HTMLSelectElement>(null);

    useInfiniteScroll({
        containerRef: dropdownRef,
        loadMore: loadMoreFondos,
        hasMore: hasMoreFondos,
        loading: loadingFondos,
    });

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(Number(event.target.value));
    };

    return (
        <div className="fondo-selector-container">
            <select
                className="custom-dropdown"
                onChange={handleChange}
                value={selectedFondo}
                size={3}
                ref={dropdownRef}
            >

                {fondos.map((fondo) => (
                    <option
                        key={fondo.id}
                        value={fondo.id}
                    >
                        {fondo.identificadorFondo}
                    </option>
                ))}
            </select>

            <div className="fondo-actions">
                <p className="loading-indicator">
                    {loadingFondos ? "Cargando fondos..." : <>&nbsp;</>}
                </p>
            </div>
        </div>
    );
};

export default FondoSelector;
