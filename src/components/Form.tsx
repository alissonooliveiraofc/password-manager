type FormProps = {
  setShowForm: (boolean : boolean) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isButtonEnabled: boolean;
  error: {
    hasMinLength: boolean,
    hasMaxLength: boolean,
    hasLettersAndNumbers: boolean,
    hasSpecialChar: boolean
  };
  handleRegister: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const VALID_PASSWORD_CHECK = 'valid-password-check';
const INVALID_PASSWORD_CHECK = 'invalid-password-check';

function Form({
  setShowForm,
  handleChange,
  isButtonEnabled,
  error,
  handleRegister,
}: FormProps) {
  return (
    <form>
      <label htmlFor="service">Nome do serviço</label>
      <input
        required
        type="text"
        name="service"
        id="service"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="login">Login</label>
      <input
        required
        type="text"
        name="login"
        id="login"
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="password">Senha</label>
      <input
        required
        type="password"
        name="password"
        id="password"
        onChange={ (event) => handleChange(event) }
      />
      <ul>
        <li
          className={ error.hasMinLength
            ? VALID_PASSWORD_CHECK
            : INVALID_PASSWORD_CHECK }
        >
          Possuir 8 ou mais caracteres
        </li>
        <li
          className={ error.hasMaxLength
            ? VALID_PASSWORD_CHECK
            : INVALID_PASSWORD_CHECK }
        >
          Possuir até 16 caracteres
        </li>
        <li
          className={ error.hasLettersAndNumbers
            ? VALID_PASSWORD_CHECK
            : INVALID_PASSWORD_CHECK }
        >
          Possuir letras e números
        </li>
        <li
          className={ error.hasSpecialChar
            ? VALID_PASSWORD_CHECK
            : INVALID_PASSWORD_CHECK }
        >
          Possuir algum caractere especial
        </li>
      </ul>
      <label htmlFor="url">URL</label>
      <input
        type="text"
        name="url"
        id="url"
        onChange={ (event) => handleChange(event) }
      />

      <button
        id="submit"
        disabled={ !isButtonEnabled }
        type="submit"
        onClick={ (event) => {
          event.preventDefault();
          handleRegister(event);
        } }
      >
        Cadastrar
      </button>
      <button onClick={ () => setShowForm(false) }>Cancelar</button>
    </form>
  );
}

export default Form;
