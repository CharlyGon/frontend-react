import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FondoManager from "./components/FondoManager/Components/FondoManager";
import Sidebar from "./layouts/sidebar/Sidebar";
import Header from "./layouts/header/Header";
import Body from "./components/Body";
//import SupportWidget from "./components/widget/Widget";
import Logs from "./components/Logs/Logs";
import TransactionSearch from "./components/TransactionSearch/Componets/TransactionSearch";
import Dashboard from "./components/Dashboard/Dashboard";

import styles from "./App.module.css";

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div className={styles.app}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <Header
                    isSidebarOpen={isSidebarOpen}
                />
                <div
                    className={styles.mainContent}
                >
                    <Body>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/funds" element={<FondoManager />} />
                            <Route path="/logs" element={<Logs />} />
                            <Route path="/search-transactions" element={<TransactionSearch />} />
                        </Routes>
                    </Body>
                </div>

                {/* SupportWidget - Future feature to provide user support and assistance */}
                {/* <SupportWidget /> */}
            </div>
        </Router>
    );
};

export default App;
