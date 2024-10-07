import React from "react";
import { FondoDetailsProps } from "../../interfaces/interfaces";

/**
 * Component for displaying the details of a selected fondo.
 * It shows information such as the fondo's identifier, rescue type,
 * and interface code. Displays a loading message while fetching data
 * and a fallback message if no details are found.
 *
 * @param {FondoDetailsProps} props - The props for the fondo details component:
 *   - fondoDetails: Object containing the fondo's details (identifier, rescue type, interface code).
 *   - loading: Boolean indicating whether the data is being loaded.
 * @returns {JSX.Element} The fondo details component.
 */
const FondoDetails: React.FC<FondoDetailsProps> = (
    { fondoDetails,
        loading
    }: FondoDetailsProps): JSX.Element => {

    if (loading) {
        return <p>Cargando detalles del fondo...</p>;
    }

    if (!fondoDetails) {
        return <p>No se encontraron detalles para este fondo.</p>;
    }

    return (
        <div>
            <p>
                <strong>
                    Identificador Fondo:
                </strong>
                {fondoDetails.identificadorFondo}
            </p>
            <p>
                <strong>
                    Tipo de Rescate:
                </strong>
                {fondoDetails.tipoRescate}
            </p>
            <p>
                <strong>
                    Código de Interfaz:
                </strong>
                {fondoDetails.codigoInterfaz}
            </p>
        </div>
    );
};

export default FondoDetails;
