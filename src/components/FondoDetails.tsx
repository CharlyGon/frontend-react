import React from "react";

interface FondoDetailsProps {
    fondoDetails: {
        identificadorFondo: string;
        tipoRescate: string;
        codigoInterfaz: string
    };
    loading: boolean;
}

const FondoDetails: React.FC<FondoDetailsProps> = ({ fondoDetails, loading }) => {
    if (loading) {
        return <p>Cargando detalles del fondo...</p>;
    }

    if (!fondoDetails) {
        return <p>No se encontraron detalles para este fondo.</p>;
    }

    return (
        <div>
            <h3>Detalles del Fondo:</h3>
            <p><strong>Identificador Fondo:</strong>
                {fondoDetails.identificadorFondo}</p>
            <p><strong>Tipo de Rescate:</strong>
                {fondoDetails.tipoRescate}</p>
            <p><strong>Código de Interfaz:</strong>
                {fondoDetails.codigoInterfaz}</p>
        </div>
    );
};

export default FondoDetails;
