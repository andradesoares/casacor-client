import { useState } from 'react';
import api from '../../services/api';

import classes from './infos.module.scss';

import { cpfMask, date } from '../../services/helpers';
import Input from '../input';
import Button from '../button';

function Infos({ usuario, setUsuario }) {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [nomeEscritorio, setNomeEscritorio] = useState(usuario.nomeEscritorio);
  const [dataDeNascimento, setDataDeNascimento] = useState(usuario.datadeNascimento);
  const [cpf, setCpf] = useState(usuario.cpf);
  const [endereco, setEndereco] = useState(usuario.endereco);

  const editarPerfilHandler = async (event) => {
    const response = await api.post(`/user/profissional/profissionalUpdate`, {
      userId: usuario.profissional_userId,
      nome,
      nomeEscritorio,
      dataDeNascimento,
      cpf,
      endereco,
    });
    setEditarPerfil(false);
    setUsuario(response.data.usuario);
  };

  const cancelarEditarPerfil = async () => {
    setEditarPerfil(false);
    setNome(usuario.nome);
    setNomeEscritorio(usuario.nomeEscritorio);
    setDataDeNascimento(usuario.datadeNascimento);
    setCpf(usuario.cpf);
  };

  const disabledButton = () => {
    return (
      nome == '' || nomeEscritorio == '' || dataDeNascimento == '' || cpf == '' || endereco == ''
    );
  };

  return (
    <>
      {editarPerfil ? (
        <div className={classes.container}>
          <form>
            <Input
              placeholder="Nome"
              type="text"
              label="Nome"
              value={nome}
              style="inline"
              onChange={(event) => setNome(event.target.value)}
            />
            <Input
              placeholder="Nome do Escritorio"
              type="text"
              label="Nome do Escritorio"
              value={nomeEscritorio}
              style="inline"
              onChange={(event) => setNomeEscritorio(event.target.value)}
            />
            <Input
              placeholder="Data de Nascimento"
              label="Data de Nascimento"
              onChange={(event) => {
                setDataDeNascimento(date(event.target.value));
              }}
              value={dataDeNascimento}
              style="inline"
            />
            <Input
              placeholder="CPF"
              label="CPF"
              type="text"
              value={cpf}
              style="inline"
              onChange={(event) => setCpf(cpfMask(event.target.value))}
            />
            <Input
              placeholder="Endereço"
              type="text"
              label="Endereço"
              value={endereco}
              style="inline"
              onChange={(event) => setEndereco(event.target.value)}
            />
            <div style={{ display: 'flex', flexDirection: 'row', padding: '0' }}>
              <div style={{ padding: '0 10px' }}>
                <Button disabled={disabledButton()} onClick={editarPerfilHandler} label="Salvar" />
              </div>
              <div style={{ padding: '0 10px' }}>
                <Button disabled={false} onClick={cancelarEditarPerfil} label="Cancelar" />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Nome:</p>
            <p>{nome}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Nome do Escritório:</p>
            <p>{nomeEscritorio}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Data de Nascimento:</p>
            <p>{dataDeNascimento}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>CPF:</p>
            <p>{cpf}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Endereço:</p>
            <p>{endereco}</p>
          </div>
          <Button
            disabled={false}
            onClick={() => {
              setEditarPerfil(true);
            }}
            label="Editar"
          />
        </div>
      )}
    </>
  );
}

export default Infos;
