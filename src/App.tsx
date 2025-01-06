import { useState } from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  const form = {
    service: '',
    login: '',
    password: '',
    url: '',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(form);

  return (
    <div>
      <header>
        <h1>Gerenciador de senhas</h1>
      </header>

      <main>
        {
          showForm ? <Form setShowForm={ setShowForm } handleChange={ handleChange } />
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
