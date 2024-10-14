import React, { useState } from "react";

import styles from "./styles/TransactionSearch.module.css";
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
        <div className={styles.mainContainer}>
            <h2 className={styles.transactionSearchTitle}>Buscar Transacciones</h2>

            {/* Wrapper for the operation number input and search button */}
            <div className={styles.operationNumberWrapper}>
                <div className={styles.operationNumberContainer}>
                    <input
                        type="text"
                        placeholder="Ingrese el ID o descripción de la transacción"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className={styles.transactionSearchInput}
                    />
                    <button
                        onClick={handleSearch}
                        className={styles.transactionSearchButton}
                    >
                        Buscar
                    </button>
                </div>
            </div>

            {/* Wrapper for the search results and additional details containers */}
            <div className={styles.resultsWrapper}>
                <div className={styles.resultContainer}>
                    <h3>Resultado Obtenido</h3>
                    <div className={styles.resultContent}>
                        {/* se agregarán los resultados */}
                    </div>
                </div>

                {/* Containers displaying additional details on the right side */}
                <div className={styles.rightContainers}>
                    <div className={styles.fileInfoContainer}>
                        <h4>Nombre Archivo</h4>
                        <p>Día:</p>
                        <p>Fondo:</p>
                    </div>

                    <div className={styles.detailsContainer}>
                        <h4>Detalles del Fondo</h4>
                        <p>Entidad Acreditar:</p>
                        <p>Sucursal Acreditar:</p>
                        <p>Digito CBU:</p>
                        <p>Bloque CBU Cuenta Acreditar:</p>
                        <p>Importe:</p>
                        <p>Referencia Univoca:</p>
                        <p>Identificador Cliente:</p>
                        <p>Clase Documento:</p>
                        <p>Tipo Documento:</p>
                        <p>Numero Documento:</p>
                        <p>Estado:</p>
                        <p>Identificador Prestamo:</p>
                        <p>Numero Operacion Link:</p>
                        <p>Filler:</p>
                        <p>Observaciones:</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionSearch;
