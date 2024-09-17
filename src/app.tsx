import React from 'react';
import List from './components/FondoManager';

const App: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de Fondos</h1>
            <List />
        </div>
    );
};

export default App;
