import React from "react";

interface BodyProps {
    children: React.ReactNode;
}

/**
 * Body component that serves as a container for the main content.
 * It wraps the content and applies styling for proper layout.
 *
 * @param {BodyProps} props - The children elements to render inside the body.
 * @returns {JSX.Element} The body content wrapped in a div.
 */
const Body: React.FC<BodyProps> = ({ children }: BodyProps): JSX.Element => {
    return <div className="body-content"
    >{children}
    </div>;
};

export default Body;
