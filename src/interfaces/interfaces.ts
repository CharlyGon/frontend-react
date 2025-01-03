import { RefObject } from "react";

export interface Fondo {
    id: number;
    identificadorFondo: string;
    tipoRescate: string;
    codigoInterfaz: string;
    bloqueCBUEmpresa: string;
    codigoConvenio: string;
    identificadorEmpresa: string;
}

export interface FileContent {
    name: string;
    content: string;
}

export interface FondoDetails {
    identificadorFondo: string;
    tipoRescate: string;
    codigoInterfaz: string;
    bloqueCBUEmpresa: string;
    codigoConvenio: string;
    identificadorEmpresa: string;
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
    onSelect: (file: { id: string; nombre: string }) => void;
    loading: boolean;
    selectedFile?: string;
    selectedDate: string | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
    loadMoreFiles: () => void;
    hasMoreFiles: boolean;
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
    hasMoreFiles: boolean;
    loadMoreFiles: () => void;
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

// Represents the content structure of each file (a background)
export interface FondoFile {
    id: string;
    identificadorFondo: string;
    fecha: string;
    nombre: string;
    orden: number;
}

// Represents the complete backend response when files are requested from a background
export interface FileResponse {
    count: number;
    pageSize: number;
    pageIndex: number;
    data: FondoFile[];
    pageCount: number;
}

export interface UseInitialLoadingResult {
    initialLoading: boolean;
    showError: string | null;
}

export interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export interface HeaderProps {
    isSidebarOpen: boolean;
}

export interface Transaction {
    idArchivo: string;
    linea: string;
    idRegistroIndividual: number;
}

export interface TransactionSearchResponse {
    count: number;
    pageSize: number;
    pageIndex: number;
    data: Transaction[];
    pageCount: number;
}

export interface UseSearchTransactionResponse {
    transactions: Transaction[];
    searchTransactions: (searchTerm: string, date: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export interface FileDetailsResponse {
    id: string;
    identificadorFondo: string;
    fecha: string;
    nombre: string;
    orden: number;
}

export interface FileInfoProps {
    fileDetails: FileDetailsResponse | null;
    fileLoading: boolean;
}

export interface FileDetailsWithFetchProps extends FileInfoProps {
    getFileDetails: (idArchivo: string) => Promise<void>;
}

export interface TransactionListProps {
    transactions: Transaction[];
    selectedTransaction: Transaction | null;
    onSelectTransaction: (transaction: Transaction) => void;
}

export interface TransactionDetailsProps {
    entidadAcreditar: string;
    sucursalAcreditar: string;
    digitoCBU: string;
    bloqueCBU: string;
    importe: string;
    referenciaUnivoca: string;
    identificadorCliente: string;
    claseDocumento: string;
    tipoDocumento: string;
    numeroDocumento: string;
    estado: string;
    identificadorPrestamo: string;
    numeroOperacionLink: string;
    filler: string;
    observaciones: string;
}

export interface UseOperationDetailsProps {
    transactionDetails: TransactionDetailsProps | null;
    loading: boolean;
    error: string | null;
    getOperationDetails: (transactionId: number) => Promise<void>;
}

export interface FileContentLine {
    linea: string;
}

export interface FetchLogsParams {
    Fecha?: string;
    Search?: string;
    TipoLog?: string;
}

export interface FetchLogsResponse {
    count: number;
    pageSize: number;
    pageIndex: number;
    data: Array<{
        fecha: string;
        tipoLog: string;
        mensaje: string;
    }>;
}

export interface LogsControlsProps {
    selectedDate: string;
    selectedLogType: string;
    handleFechaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTipoLogChange: (value: string) => void;
    handleSearch: () => void;
    inputAnimation: boolean;
}

export interface UseLogsResult {
    logs: FetchLogsResponse | null;
    loading: boolean;
    error: string | null;
    resetLogs: () => void;
}

export interface CustomWindow extends Window {
    _env_: {
        REACT_APP_API_BASE_URL?: string;
    };
}
