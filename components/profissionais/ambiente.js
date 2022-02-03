import { useState } from 'react';
import api from '../../services/api';

import classes from './ambiente.module.scss';

function Ambiente({ ambiente, userId, setAmbiente }) {
  const [editarAmbiente, setEditarAmbiente] = useState(false);
  const [nome, setNome] = useState(ambiente?.nome);
  const [aguaDeChuva, setAguaDeChuva] = useState(ambiente?.Sustentabilidade.aguaDeChuva);
  const [materialReciclavel, setMaterialReciclavel] = useState(
    ambiente?.Sustentabilidade.materialReciclavel
  );
  const [energiaSolar, setEnergiaSolar] = useState(ambiente?.Sustentabilidade.energiaSolar);
  const [nomeResponsavelObra, setNomeResponsavelObra] = useState(ambiente?.nomeResponsavelObra);
  const [telefoneResponsavelObra, setTelefoneResponsavelObra] = useState(
    ambiente?.telefoneResponsavelObra
  );
  const [emailResponsavelObra, setEmailResponsavelObra] = useState(ambiente?.emailResponsavelObra);

  const editarAmbienteHandler = async (event) => {
    event.preventDefault();
    const response = await api.post(`/profissional/editarAmbiente`, {
      nome,
      nomeResponsavelObra,
      telefoneResponsavelObra,
      emailResponsavelObra,
      userId,
      aguaDeChuva,
      materialReciclavel,
      energiaSolar,
    });
    setEditarAmbiente(false);
    setAmbiente(response.data.ambiente);
  };

  const checklist = () => {
    return (
      <div>
        <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Sustentabilidade</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <input
              onClick={() => {
                sustentabilidadeHandler(aguaDeChuva, setAguaDeChuva);
              }}
              type="checkbox"
              value={aguaDeChuva}
              name="gender"
              defaultChecked={aguaDeChuva}
            />{' '}
            Agua de chuva
          </div>
          <div>
            <input
              onClick={() => {
                sustentabilidadeHandler(materialReciclavel, setMaterialReciclavel);
              }}
              type="checkbox"
              value={materialReciclavel}
              name="gender"
              defaultChecked={materialReciclavel}
            />{' '}
            Materiais Reciclaveis
          </div>
          <div>
            <input
              onClick={() => {
                sustentabilidadeHandler(energiaSolar, setEnergiaSolar);
              }}
              type="checkbox"
              value={energiaSolar}
              name="gender"
              defaultChecked={energiaSolar}
            />{' '}
            Energia Solar
          </div>
        </div>
      </div>
    );
  };

  const sustentabilidadeHandler = (value, set) => {
    set(!value);
  };

  return (
    <>
      {editarAmbiente ? (
        <div className={classes.container}>
          <form onSubmit={editarAmbienteHandler}>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="nome">
                Nome do Ambiente:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder=" Nome do Ambiente"
                  type="text"
                  name="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="nomeResponsavelObra">
                Nome do Responsavel pela Obra:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Nome do Responsavel pela Obra"
                  type="text"
                  name="nomeResponsavelObra"
                  value={nomeResponsavelObra}
                  onChange={(event) => setNomeResponsavelObra(event.target.value)}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="telefoneResponsavelObra">
                Telefone do Responsavel pela Obra:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Telefone do Responsavel pela Obra"
                  name="telefoneResponsavelObra"
                  value={telefoneResponsavelObra}
                  onChange={(event) => setTelefoneResponsavelObra(event.target.value)}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="emailResponsavelObra">
                Email do Responsavel pela Obra:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Email do Responsavel pela Obra"
                  type="email"
                  name="emailResponsavelObra"
                  value={emailResponsavelObra}
                  onChange={(event) => setEmailResponsavelObra(event.target.value)}
                />
              </div>
            </div>
            {checklist()}
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
              <div>
                <button className={`${classes.button} ${classes.buttonEnabled}`}>Salvar</button>
              </div>
              <div>
                <button
                  className={`${classes.button} ${classes.buttonEnabled}`}
                  onClick={() => {
                    setEditarAmbiente(false);
                    setNome(ambiente?.nome);
                    setEmailResponsavelObra(ambiente?.emailResponsavelObra);
                    setTelefoneResponsavelObra(ambiente?.telefoneResponsavelObra);
                    setNomeResponsavelObra(ambiente?.nomeResponsavelObra);
                    setAguaDeChuva(ambiente?.Sustentabilidade.aguaDeChuva);
                    setMaterialReciclavel(ambiente?.Sustentabilidade.materialReciclavel);
                    setEnergiaSolar(ambiente?.Sustentabilidade.energiaSolar);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Nome do Ambiente:</p>
            <p>{nome}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Nome do Responsavel pela Obra:</p>
            <p>{nomeResponsavelObra}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Telefone do Responsavel pela Obra:</p>
            <p>{telefoneResponsavelObra}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Email do Responsavel pela Obra:</p>
            <p>{emailResponsavelObra}</p>
          </div>

          {checklist()}
          <button
            style={{ marginTop: '30px' }}
            className={`${classes.button} ${classes.buttonEnabled}`}
            onClick={() => {
              setEditarAmbiente(true);
            }}
          >
            Editar
          </button>
        </div>
      )}
    </>
  );
}

export default Ambiente;
