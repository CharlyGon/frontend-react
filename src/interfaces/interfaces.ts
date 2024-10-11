import { RefObject } from "react";

export interface Fondo {
    id: number;
    identificadorFondo: string;
    tipoRescate: string;
    codigoInterfaz: string;
}

export interface FileContent {
    name: string;
    content: string;
}

export interface FondoDetails {
    identificadorFondo: string;
    tipoRescate: string;
    codigoInterfaz: string;
}

export interface FondoDetailsProps {
    fondoDetails: FondoDetails;
    loading: boolean;
}

export interface UseInfiniteScrollProps {
    containerRef: React.RefObject<HTMLElement>;
    loadMore: () => void;
    hasMore: boolean;
    loading: boolean;
    offset?: number;
}

export interface FondoSelectorProps {
    fondos: Fondo[];
    onSelect: (codFondo: number) => void;
    selectedFondo?: number;
    loadMoreFondos: () => void;
    hasMoreFondos: boolean;
    loadingFondos: boolean;
}

export interface FileSelectorProps {
    files: Array<{ id: string; nombre: string }>;
    onSelect: (fileId: string) => void;
    loading: boolean;
    selectedFile?: string;
    selectedDate: string | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface FileContentProps {
    fileContent: string | null;
    selectedFile: string | undefined;
    loading: boolean;
    onDownload: () => void;
    fileContentRef: RefObject<HTMLPreElement>;
}

export interface HealthEntry {
    status: string;
    duration: string;
    description?: string;
}

export interface HealthStatusService {
    status: string;
    totalDuration: string;
    entries: {
        [key: string]: HealthEntry;
    };
}

export enum HealthState {
    Healthy = 'Healthy',
    Unhealthy = 'Unhealthy',
}

export enum StatusColor {
    Healthy = "green",
    Warning = "yellow",
    Unhealthy = "red",
}

export enum HttpStatusCode {
    OK = 200,
    SERVICE_UNAVAILABLE = 503
};

export interface UseFondosResult {
    fondos: Fondo[];
    loadingFondos: boolean;
    hasMoreFondos: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    errorFondos: string | null;
}

export interface UseFilesResult {
    files: Array<{ id: string; nombre: string }>;
    loadingFiles: boolean;
}

export interface UseFileContentResult {
    fileContent: string[];
    loadingFileContent: boolean;
    hasMoreFileContent: boolean;
    setFilePage: React.Dispatch<React.SetStateAction<number>>;
}

export interface ServiceCardProps {
    entryKey: string;
    status: string;
    duration: string;
    description?: string;
    isExpanded: boolean;
    toggleExpand: () => void;
}

// Representa la estructura del contenido de cada archivo (un fondo)
export interface FondoFile {
    id: string;
    identificadorFondo: string;
    fecha: string;  // Puedes cambiar a tipo Date si prefieres manejar fechas como objetos de fecha
    nombre: string;
    orden: number;
}

// Representa la respuesta completa del backend cuando se solicitan archivos de un fondo
export interface FileResponse {
    count: number;
    pageSize: number;
    pageIndex: number;
    data: FondoFile[];
    pageCount: number;
}
