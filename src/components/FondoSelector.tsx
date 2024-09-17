import React from "react";

interface FondoSelectorProps {
    fondos: {
        codFondo: number;
        identificadorFondo: string
    }[];
    onSelect: (codFondo: number) => void;
    selectedFondo?: number;
}

const FondoSelector: React.FC<FondoSelectorProps> = ({ fondos, onSelect, selectedFondo }) => {
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
