import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import copy from 'clipboard-copy';
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
    const { service, login, password } = formData;

    if (!service || !login || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }

    const updatedPasswords = [...passwords, formData];
    setPasswords(updatedPasswords);

    // Salvar no localStorage
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));

    setFormData({ service: '', login: '', password: '', url: '' });

    setShowForm(false);

    Swal.fire({
      icon: 'success',
      title: 'Serviço cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(form);
  const [error, setError] = useState({
    hasMinLength: false,
    hasMaxLength: true,
    hasLettersAndNumbers: false,
    hasSpecialChar: false });

  const [passwords, setPasswords] = useState<typeof form[]>([]);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean[]>([]);

  useEffect(() => {
    const storedPasswords = localStorage.getItem('passwords');
    if (storedPasswords) {
      const parsedPasswords = JSON.parse(storedPasswords);
      setPasswords(parsedPasswords);
      setPasswordVisibility(new Array(parsedPasswords.length).fill(false));
    }
  }, []);

  function removePassword(index: number) {
    const newPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(newPasswords);
    setPasswordVisibility(newPasswords.map(() => false));

    // Atualizar o localStorage
    localStorage.setItem('passwords', JSON.stringify(newPasswords));
  }

  function togglePasswordVisibility(index: number) {
    const newVisibility = [...passwordVisibility];
    newVisibility[index] = !newVisibility[index];
    setPasswordVisibility(newVisibility);
  }

  return (
    <div>
      <header>
        <h1 className="titulo-app">
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
          <ul className="passwords-list">
            {passwords.map((password, index) => (
              password.service
              && password.login && password.password && (
                <li className="cards" key={ index }>
                  <a href={ password.url ? `http://${password.url}` : '#' } target="_blank" rel="noopener noreferrer">
                    {password.service}
                  </a>
                  <p>
                    <span className="card-text">Login:</span>
                    {' '}
                    {password.login}
                  </p>
                  <p>
                    <span className="card-text">Senha:</span>
                    {' '}
                    {passwordVisibility[index] ? password.password : '******'}
                  </p>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={ passwordVisibility[index] }
                      onChange={ () => togglePasswordVisibility(index) }
                    />
                    {' '}
                    Mostrar senha
                  </label>
                  <button
                    className="copy-btn"
                    onClick={ () => {
                      copy(password.password);
                      Swal.fire({
                        icon: 'success',
                        title: 'Senha copiada!',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } }
                  >
                    <img className="copy-icon" src="/images/copy.png" alt="Copy Icon" />
                  </button>
                  <button
                    data-testid="remove-btn"
                    onClick={ () => {
                      Swal.fire({
                        title: 'Tem certeza que deseja apagar essa senha?',
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: 'Apagar',
                        denyButtonText: 'Manter Senha',
                        cancelButtonText: 'Cancelar',
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          Swal.fire('Senha Apagada!', '', 'success');
                          removePassword(index);
                        }
                      });
                    } }
                  >
                    Apagar senha
                  </button>
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
