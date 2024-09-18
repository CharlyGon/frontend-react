import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/FondoManager/FondoManager";
import Sidebar from "./layouts/sidebar/Sidebar";
import Header from "./layouts/header/Header";
import Welcome from "./components/Welcome";
import Body from "./components/Body"; 

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div className="app">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Header isSidebarOpen={isSidebarOpen} />
                <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                    <Body>
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/dashboard" element={<List />} />
                        </Routes>
                    </Body>
                </div>
            </div>
        </Router>
    );
};

export default App;
