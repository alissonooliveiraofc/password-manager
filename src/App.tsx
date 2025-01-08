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

    if (name === 'password') {
      const hasMinLength = value.length >= 8;
      const hasMaxLength = value.length <= 16;
      const hasLettersAndNumbers = /[a-zA-Z]/.test(value) && /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      setError({
        hasMinLength,
        hasMaxLength,
        hasLettersAndNumbers,
        hasSpecialChar,
      });
    }
  };

  const handleRegister = () => {
    setPasswords([...passwords, formData]);

    setFormData({ service: '', login: '', password: '', url: '' });

    setShowForm(false);
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
    return (
      setIsButtonEnabled(false)

    );
  };

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(form);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [error, setError] = useState({
    hasMinLength: false,
    hasMaxLength: true,
    hasLettersAndNumbers: false,
    hasSpecialChar: false });

  const [passwords, setPasswords] = useState([form]);
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
            error={ error }
            handleRegister={ handleRegister }

          />
            : (
              <button onClick={ () => setShowForm(true) }>
                Cadastrar nova senha
              </button>
            )
        }
      </main>

      <section>
        <h2>Senhas cadastradas</h2>
        {passwords.length === 0 ? (
          <p>Nenhuma senha cadastrada</p>
        ) : (
          <ul>
            {passwords.map((password, index) => (
              password.service && password.login && password.password && password.url && (
                <li key={ index }>
                  <a href={ password.url } target="_blank" rel="noopener noreferrer">
                    {password.service}
                  </a>
                  <p>
                    Login:
                    {password.login}
                  </p>
                  <p>
                    Senha:
                    {password.password}
                  </p>
                </li>
              )
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
