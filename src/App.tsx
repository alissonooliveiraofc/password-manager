import { useState } from 'react';
import Swal from 'sweetalert2';
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

    Swal.fire({
      icon: 'success',
      title: 'Serviço cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500,
    });
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
  const [hidePasswords, setHidePasswords] = useState(false);
  const [error, setError] = useState({
    hasMinLength: false,
    hasMaxLength: true,
    hasLettersAndNumbers: false,
    hasSpecialChar: false });

  const [passwords, setPasswords] = useState<typeof form[]>([]);

  function removePassword(index: number) {
    const newPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(newPasswords);
  }
  return (
    <div>
      <header>
        <h1>
          Gerenciador
          {' '}
          <span className="asterisco">*</span>
          {' '}
          de
          {' '}
          <span className="asterisco">*</span>
          {' '}
          senhas
        </h1>
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
              <div>
                <button onClick={ () => setShowForm(true) }>
                  Cadastrar nova senha
                </button>
                <span className="linha" />
              </div>

            )
        }
      </main>

      <section>
        <h2>Senhas cadastradas</h2>
        {passwords.length === 0 ? (
          <div>
            <p className="locker-phrase">Nenhuma senha cadastrada</p>
            <img id="locker-icon" src="./src/assets/locker.svg" alt="" />
          </div>
        ) : (
          <>
            <div>
              <label className="checkbox-container">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={ hidePasswords }
                  onChange={ (event) => setHidePasswords(event.target.checked) }
                />
                {' '}
                Esconder senhas
              </label>
            </div>
            <ul>
              {passwords.map((password, index) => (
                password.service
                && password.login && password.password && password.url && (
                  <li className="cards" key={ index }>
                    <a href={ `http://${password.url}` } target="_blank" rel="noopener noreferrer">
                      {password.service}
                    </a>
                    <p>
                      Login:
                      {' '}
                      {password.login}
                    </p>
                    <p>
                      Senha:
                      {' '}
                      {hidePasswords ? '******' : password.password}
                    </p>
                    <button
                      data-testid="remove-btn"
                      onClick={ () => removePassword(index) }
                    >
                      Apagar senha
                    </button>
                  </li>
                )
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
