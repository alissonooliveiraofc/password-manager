function Form() {
  return (
    <form>
      <label htmlFor="service">Nome do serviço</label>
      <input type="text" name="service" id="service" />

      <label htmlFor="login">Login</label>
      <input type="text" name="login" id="login" />

      <label htmlFor="password">Senha</label>
      <input type="password" name="password" id="password" />

      <label htmlFor="url">URL</label>
      <input type="text" name="url" id="url" />

      <button>Cadastrar</button>
      <button>Cancelar</button>
    </form>
  );
}

export default Form;
