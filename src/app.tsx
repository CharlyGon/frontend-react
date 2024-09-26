import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FondoManager from "./components/FondoManager/FondoManager";
import Sidebar from "./layouts/sidebar/Sidebar";
import Header from "./layouts/header/Header";
import Welcome from "./components/Welcome";
import Body from "./components/Body";
import SupportWidget from "./components/widget/Widget";
import Logs from "./components/Logs/Logs";

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div className="app">
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <Header
                    isSidebarOpen={isSidebarOpen}
                />
                <div
                    className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
                >
                    <Body>
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/dashboard" />
                            <Route path="/funds" element={<FondoManager />} />
                            <Route path="/logs" element={<Logs />} />
                        </Routes>
                    </Body>
                </div>
                <SupportWidget />
            </div>
        </Router>
    );
};

export default App;
