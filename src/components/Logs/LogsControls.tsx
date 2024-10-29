import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LogsControlsProps } from "../../interfaces/interfaces";

const logOptions = [
    { value: "", label: "Todos" },
    { value: "LogInfo", label: "Log Info" },
    { value: "LogError", label: "Log Error" },
    { value: "LogWarning", label: "Log Warning" }
];

/**
/* LogsControls Component.
/*
/* This component is responsible for rendering the controls for selecting the date,
/* the type of log, and the search button. It allows the user to filter logs based
/* on their criteria.
/*
/* @param {LogsControlsProps} props - The props for the component.
/*   - selectedDate: The selected date for filtering logs.
/*   - selectedLogType: The selected log type for filtering logs.
/*   - handleFechaChange: The function to handle date changes.
/*   - handleTipoLogChange: The function to handle log type changes.
/*   - handleSearch: The function to handle search button clicks.
/*   - inputAnimation: A boolean to trigger the input animation.
/* @returns {JSX.Element} The rendered component with controls for logs filtering.
*/
export const LogsControls: React.FC<LogsControlsProps> = ({
    selectedDate,
    selectedLogType,
    handleFechaChange,
    handleTipoLogChange,
    handleSearch,
    inputAnimation
  }: LogsControlsProps): JSX.Element => (
        <div className="logs-controls">
            <input
                type="datetime-local"
                value={selectedDate}
                onChange={handleFechaChange}
                placeholder="Selecciona una fecha"
                className={inputAnimation ? "bright" : ""}
            />
            <Select
                options={logOptions}
                onChange={(selectedOption) => handleTipoLogChange(selectedOption?.value ?? "")}
                value={logOptions.find(option => option.value === selectedLogType)}
                styles={{
                    control: (base) => ({
                        ...base,
                        border: "1px solid #007bff",
                        boxShadow: "none",
                        "&:hover": {
                            border: "1px solid #0056b3"
                        }
                    })
                }}
            />
            <button
                className="search-button"
                onClick={handleSearch}
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                />
            </button>
        </div>
    );

export default LogsControls;
