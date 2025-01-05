type FormProps = {
  setShowForm: (boolean : boolean) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Form({ setShowForm, handleChange }: FormProps) {
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

      <label htmlFor="url">URL</label>
      <input
        type="text"
        name="url"
        id="url"
        onChange={ (event) => handleChange(event) }
      />

      <button disabled>Cadastrar</button>
      <button onClick={ () => setShowForm(false) }>Cancelar</button>
    </form>
  );
}

export default Form;
