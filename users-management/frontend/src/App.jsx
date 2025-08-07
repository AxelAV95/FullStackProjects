import { useState, useEffect } from 'react';
import UserList from './components/UserList';
import { healthAPI } from './services/api';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await healthAPI.verificar();
      setBackendStatus('connected');
    } catch (error) {
      setBackendStatus('disconnected');
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Mi Sistema</h1>
        <div className={`status ${backendStatus}`}>
          Backend: {backendStatus === 'connected' ? 'Conectado' : 
                   backendStatus === 'disconnected' ? 'Desconectado' : 'Verificando...'}
        </div>
      </header>
      
      <main className="app-main">
        {backendStatus === 'connected' ? (
          <UserList />
        ) : (
          <div className="connection-error">
            No se puede conectar al backend. Asegúrate de que esté ejecutándose.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;