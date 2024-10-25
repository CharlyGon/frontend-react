import React, { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { FondoSelectorProps } from "../../../interfaces/interfaces";
import Select, { SingleValue } from 'react-select';

import styles from "../styles/FondoSelector.module.css";

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
    const [highlight, setHighlight] = useState(false);

    useInfiniteScroll({
        containerRef: dropdownRef,
        loadMore: loadMoreFondos,
        hasMore: hasMoreFondos,
        loading: loadingFondos,
    });

    // Convertir fondos a un formato que sea compatible con react-select
    const options = fondos.map((fondo) => ({
        value: fondo.id.toString(),
        label: fondo.identificadorFondo,
    }));

    const handleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
        if (selectedOption) {
            onSelect(Number(selectedOption.value));
        }
    };

    useEffect(() => {
        if (fondos.length > 0 && !selectedFondo) {
            setHighlight(true);
            const timer = setTimeout(() => setHighlight(false), 2000);
            return () => clearTimeout(timer);
        } else {
            setHighlight(false);
        }
    }, [fondos, selectedFondo]);

    return (
        <div className={styles.fondoSelectorContainer}>
            <Select
                options={options}
                onChange={handleChange}
                value={options.find(option => option.value === selectedFondo?.toString()) ?? null}
                placeholder={fondos.length > 0 ? "--- Selecciona un fondo ---" : "No se encontraron fondos"}
                isLoading={loadingFondos}
                className={`${styles.selectButton}`}
                classNamePrefix="react-select"
                onMenuScrollToBottom={loadMoreFondos}
                menuPortalTarget={document.body}
                menuPlacement="auto"
                styles={{
                    control: (base) => ({
                        ...base,
                        width: "100%",
                        minHeight: "40px",
                        textAlign: "center",
                    }),
                    placeholder: (base) => ({
                        ...base,
                        textAlign: "center",
                        color: highlight ? "rgba(0, 56, 145, 0.7)" : base.color,
                        fontWeight: highlight ? "bold" : base.fontWeight,
                        transition: "color 0.3s ease, font-weight 0.3s ease",
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 1000,
                    }),
                }}
            />

            <div className={styles.fondoActions}>
                <p className={styles.loadingIndicator}>
                    {loadingFondos ? "Cargando fondos..." : <>&nbsp;</>}
                </p>
            </div>
        </div>
    );
};

export default FondoSelector;
