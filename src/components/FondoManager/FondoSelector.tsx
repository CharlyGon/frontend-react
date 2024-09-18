import React from "react";

interface FondoSelectorProps {
    fondos: {
        codFondo: number;
        identificadorFondo: string
    }[];
    onSelect: (codFondo: number) => void;
    selectedFondo?: number;
}

/**
 * Component for selecting a fondo from a list.
 * Displays a dropdown menu that allows the user to select a fondo by its identifier.
 *
 * @param {FondoSelectorProps} props - The props for the fondo selector component:
 *   - fondos: List of fondos to display.
 *   - onSelect: Callback function to handle fondo selection.
 *   - selectedFondo: The currently selected fondo (optional).
 * @returns {JSX.Element} The fondo selector component.
 */
const FondoSelector: React.FC<FondoSelectorProps> = (
    {
        fondos,
        onSelect,
        selectedFondo
    }: FondoSelectorProps): JSX.Element => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(Number(event.target.value));
    };

    return (
        <div>
            <label htmlFor="fondoSelect">Selecciona un fondo:</label>
            <select id="fondoSelect" onChange={handleChange} value={selectedFondo}>
                <option value="">-- Selecciona un fondo --</option>
                {fondos.map((fondo) => (
                    <option
                        key={fondo.codFondo}
                        value={fondo.codFondo}
                    >
                        {fondo.identificadorFondo}
                        (Código: {fondo.codFondo})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FondoSelector;
