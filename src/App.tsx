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
    verifyForm();
  };

  const verifyForm = () => {
    const { service, login, password } = formData;

    const hasLength = password.length >= 8 && password.length <= 16;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      service.length > 0
      && login.length > 0
      && password.length > 0
      && hasLength
      && hasLetter
      && hasNumber
      && hasSpecialChar
    ) {
      return setIsButtonEnabled(true);
    }
    return setIsButtonEnabled(false);
  };

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(form);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  return (
    <div>
      <header>
        <h1>Gerenciador de senhas</h1>
      </header>

      <main>
        {
          showForm ? <Form
            setShowForm={ setShowForm }
            handleChange={ handleChange }
            isButtonEnabled={ isButtonEnabled }
          />
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
