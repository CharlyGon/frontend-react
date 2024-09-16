import React from 'react';
import { mockData } from './data/mockData';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Usuarios</h1>
      <ul>
        {mockData.map((user) => (
          <li key={user.id}>
            <strong>Nombre:</strong> {user.name}, <strong>Email:</strong> {user.email}, <strong>Edad:</strong> {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
