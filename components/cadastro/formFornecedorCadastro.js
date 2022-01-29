import { useState } from 'react';
import { signUp } from '../../services/auth';

function FormFornecedorCadastro() {
  const [nome, setNome] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [siteEmpresa, setSiteEmpresa] = useState('');
  const [perfilInstagram, setPerfilInstagram] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    signUp(
      {
        nome,
        descricaoProduto,
        tipo: 'fornecedor',
        telefone,
        email,
        siteEmpresa,
        perfilInstagram,
        password,
      },
      setError
    );
  };

  return (
    <section>
      <h1>Cadastro Fornecedor</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            placeholder="Nome"
            type="text"
            id="nome"
            required
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Descrição do produto"
            type="text"
            id="descricaoProduto"
            required
            value={descricaoProduto}
            onChange={(event) => setDescricaoProduto(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Telefone"
            type="tel"
            required
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Site da empresa"
            type="text"
            required
            value={siteEmpresa}
            onChange={(event) => setSiteEmpresa(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Perfil Instagram"
            type="text"
            required
            value={perfilInstagram}
            onChange={(event) => setPerfilInstagram(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button>Criar Conta</button>
        </div>
      </form>
      <div>{error}</div>
    </section>
  );
}

export default FormFornecedorCadastro;
