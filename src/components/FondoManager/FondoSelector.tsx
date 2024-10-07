import React, { useRef } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
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
        <div>
            <select
                onChange={handleChange}
                value={selectedFondo}
                className="custom-dropdown"
                size={3}
                ref={dropdownRef}
            >
                <option value="" disabled>
                    -- Selecciona un fondo --
                </option>
                {fondos.map((fondo) => (
                    <option
                        key={fondo.id}
                        value={fondo.id}
                    >
                        {fondo.identificadorFondo}
                    </option>
                ))}
            </select>
            {loadingFondos && <p>Cargando más fondos...</p>}
        </div>
    );
};

export default FondoSelector;
