import React, { useState } from "react";
import "./Widget.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

/**
 * Chat widget component that toggles a chat  box for user interaction.
 * @returns {JSX.Element} The chat widget component
 */
const Widget: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chat-widget-container ${isOpen ? "open" : ""}`}>
      <button
        className="chat-button"
        onClick={toggleWidget}
      >
        <FontAwesomeIcon
          icon={faCommentDots}
          className="chat-icon" />
      </button>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h2>Soporte</h2>
          </div>

          <div className="chat-body">
            <p>Welcome to this awesome chat!</p>
          </div>

          <div className="chat-footer">
            <div className="message-input-container">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="message-input"
              />
              <button className="send-button">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="send-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;
