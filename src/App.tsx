import { useState } from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <header>
        <h1>Gerenciador de senhas</h1>
      </header>

      <main>
        {
          showForm ? <Form setShowForm={ setShowForm } />
            : (
              <button onClick={ () => setShowForm(true) }>
                Cadastrar nova senha
              </button>
            )
        }
      </main>
    </div>
  );
}

export default App;
