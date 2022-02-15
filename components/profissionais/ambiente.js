import { useState } from 'react';

import api from '../../services/api';
import classes from './ambiente.module.scss';
import Input from '../input';
import Button from '../button';

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
              disabled={!editarAmbiente}
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
              disabled={!editarAmbiente}
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
              disabled={!editarAmbiente}
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
          <form>
            <Input
              placeholder="Nome do Ambiente"
              type="text"
              label="Nome do Ambiente"
              style="inline"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
            <Input
              placeholder="Nome do Responsavel pela Obra"
              type="text"
              label="Nome do Responsavel pela Obra"
              style="inline"
              value={nomeResponsavelObra}
              onChange={(event) => setNomeResponsavelObra(event.target.value)}
            />
            <Input
              placeholder="Telefone do Responsavel pela Obra"
              type="text"
              label="Telefone do Responsavel pela Obra"
              style="inline"
              value={telefoneResponsavelObra}
              onChange={(event) => setTelefoneResponsavelObra(event.target.value)}
            />
            <Input
              placeholder="Email do Responsavel pela Obra"
              type="text"
              label="Email do Responsavel pela Obra"
              style="inline"
              value={emailResponsavelObra}
              onChange={(event) => setEmailResponsavelObra(event.target.value)}
            />
            {checklist()}
            <div style={{ display: 'flex', flexDirection: 'row', padding: '0' }}>
              <div style={{ padding: '0 10px' }}>
                <Button disabled={false} onClick={editarAmbienteHandler} label="Salvar" />
              </div>
              <div style={{ padding: '0 10px' }}>
                <Button
                  disabled={false}
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
                  label="Cancelar"
                />
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
          <Button
            disabled={false}
            onClick={() => {
              setEditarAmbiente(true);
            }}
            label="Editar"
          />
        </div>
      )}
    </>
  );
}

export default Ambiente;
