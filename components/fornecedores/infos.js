import { useState } from 'react';
import api from '../../services/api';

import classes from './infos.module.scss';

import { phone } from '../../services/helpers';
import Input from '../input';
import Button from '../button';

function Infos({ usuario, setUsuario }) {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [descricaoProduto, setDescricaoProduto] = useState(usuario.descricaoProduto);
  const [telefone, setTelefone] = useState(usuario.telefone);
  const [siteEmpresa, setSiteEmpresa] = useState(usuario.siteEmpresa);
  const [perfilInstagram, setPerfilInstagram] = useState(usuario.perfilInstagram);

  const editarPerfilHandler = async (event) => {
    event.preventDefault();
    const response = await api.post(`/user/fornecedor/fornecedorUpdate`, {
      userId: usuario.fornecedor_userId,
      nome,
      descricaoProduto,
      telefone,
      siteEmpresa,
      perfilInstagram,
    });
    setEditarPerfil(false);
    setUsuario(response.data.usuario);
  };

  const cancelarEditarPerfil = async () => {
    setEditarPerfil(false);
    setNome(usuario.nome);
    setDescricaoProduto(usuario.descricaoProduto);
    setTelefone(usuario.telefone);
    setSiteEmpresa(usuario.siteEmpresa);
    setPerfilInstagram(usuario.perfilInstagram);
  };

  const disabledButton = () => {
    return (
      nome == '' ||
      descricaoProduto == '' ||
      telefone == '' ||
      siteEmpresa == '' ||
      perfilInstagram == ''
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
              placeholder="Descrição do produto"
              type="text"
              label="Descrição do produto"
              value={descricaoProduto}
              style="inline"
              onChange={(event) => setDescricaoProduto(event.target.value)}
            />
            <Input
              placeholder="Telefone"
              type="text"
              label="Telefone"
              value={telefone}
              style="inline"
              onChange={(event) => setTelefone(phone(event.target.value))}
            />
            <Input
              placeholder="Site da empresa"
              type="text"
              label="Site da empresa"
              value={siteEmpresa}
              style="inline"
              onChange={(event) => setSiteEmpresa(event.target.value)}
            />
            <Input
              placeholder="Perfil Instagram"
              type="text"
              label="Perfil Instagram"
              value={siteEmpresa}
              style="inline"
              onChange={(event) => setPerfilInstagram(event.target.value)}
            />
            <div style={{ display: 'flex', flexDirection: 'row', padding: '0' }}>
              <div>
                <Button disabled={disabledButton()} onClick={editarPerfilHandler} label="Salvar" />
              </div>
              <div>
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
            <p className={classes.titulo}>Descrição do Produto:</p>
            <p>{descricaoProduto}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Telefone:</p>
            <p>{telefone}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Site da Empresa:</p>
            <p>{siteEmpresa}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Perfil no Instagram:</p>
            <p>{perfilInstagram}</p>
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
