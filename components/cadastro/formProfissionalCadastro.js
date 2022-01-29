import { useState } from 'react';
import { signUp } from '../../services/auth';

function FormProfissionalCadastro() {
  const [nome, setNome] = useState('');
  const [nomeEscritorio, setNomeEscritorio] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nomeResponsavelObra, setNomeResponsavelObra] = useState('');
  const [telefoneResponsavelObra, setTelefoneResponsavelObra] = useState('');
  const [emailResponsavelObra, setEmailResponsavelObra] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    signUp(
      {
        nome,
        nomeEscritorio,
        dataDeNascimento,
        tipo: 'profissional',
        cpf,
        email,
        endereco,
        nomeResponsavelObra,
        telefoneResponsavelObra,
        emailResponsavelObra,
        password,
      },
      setError
    );
  };

  return (
    <section>
      <h1>Cadastro Profissional</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            placeholder="Nome"
            type="text"
            required
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Nome do Escritorio"
            type="text"
            required
            value={nomeEscritorio}
            onChange={(event) => setNomeEscritorio(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Data de Nascimento"
            type="date"
            required
            value={dataDeNascimento}
            onChange={(event) => setDataDeNascimento(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="CPF"
            type="text"
            required
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
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
            placeholder="Endereço"
            type="string"
            required
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Nome do Responsavel pela Obra"
            type="text"
            required
            value={nomeResponsavelObra}
            onChange={(event) => setNomeResponsavelObra(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Telefone do Responsavel pela Obra"
            type="tel"
            required
            value={telefoneResponsavelObra}
            onChange={(event) => setTelefoneResponsavelObra(event.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Email do Responsavel pela Obra"
            type="email"
            required
            value={emailResponsavelObra}
            onChange={(event) => setEmailResponsavelObra(event.target.value)}
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

export default FormProfissionalCadastro;
