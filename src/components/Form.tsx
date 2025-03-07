type FormProps = {
  setShowForm: (boolean : boolean) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        autoComplete="off"
        onChange={ (event) => handleChange(event) }
      />
      <div className="labels">
        <label htmlFor="login">Login</label>
        <label id="senha-text" htmlFor="password">Senha</label>
      </div>
      <div className="form-row">
        <input
          required
          type="text"
          name="login"
          id="login"
          autoComplete="off"
          onChange={ (event) => handleChange(event) }
        />

        <input
          required
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          onChange={ (event) => handleChange(event) }
        />
      </div>

      <ul className="password-check">
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
        autoComplete="off"
        onChange={ (event) => handleChange(event) }
      />

      <div className="button-grade">
        <button
          id="submit"
          type="submit"
          onClick={ (event) => {
            event.preventDefault();
            handleRegister(event);
          } }
        >
          Cadastrar
        </button>
        <button className="cancel" onClick={ () => setShowForm(false) }>Cancelar</button>
      </div>

    </form>
  );
}

export default Form;
