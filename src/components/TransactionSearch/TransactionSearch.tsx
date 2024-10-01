import React, { useState } from "react";
import "./TransactionSearch.css";

/**
 * Component to search for transactions.
 * This component allows the user to search for transactions by entering an identifier.
 *
 * @returns {JSX.Element} Transaction search component.
 */
const TransactionSearch: React.FC = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            console.log(`Buscando transacciones con el término: ${searchTerm}`);
        } else {
            console.log("Ingrese un término de búsqueda válido.");
        }
    };

    return (
        <div className="transaction-search-container">
            <h2
                className="transaction-search-title"
            >
                Buscar Transacciones
            </h2>
            <div className="transaction-search-card">
                <input
                    type="text"
                    placeholder="Ingrese el ID o descripción de la transacción"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="transaction-search-input"
                />
                <button
                    onClick={handleSearch}
                    className="transaction-search-button">
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default TransactionSearch;
