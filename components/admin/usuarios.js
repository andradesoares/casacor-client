import { useState } from 'react';
import Link from 'next/link';

import { dynamicSort } from '../../services/helpers';
import Usuario from './usuario';
import api from '../../services/api';

import classes from './usuarios.module.scss';

const Usuarios = ({
  usuarioTipo,
  adminId,
  profissionais,
  fornecedores,
  setFornecedores,
  setProfissionais,
}) => {
  const [tipo, setTipo] = useState('profissional');
  const [display, setDisplay] = useState('todos');
  const [usuario, setUsuario] = useState([]);

  const updateStatus = async (tipoUsuario, status, userId) => {
    const response = await api.post(`/admin/respostaCadastro`, {
      admin_userId: adminId,
      tipoUsuario: tipoUsuario,
      status: status,
      userId: userId,
    });

    if (tipoUsuario == 'fornecedor') {
      setFornecedores(
        fornecedores.map((fornecedor) =>
          fornecedor.fornecedor_userId == response.data.usuario.fornecedor_userId
            ? response.data.usuario
            : fornecedor
        )
      );
    } else if (tipoUsuario == 'profissional') {
      setProfissionais(
        profissionais.map((profissional) =>
          profissional.profissional_userId == response.data.usuario.profissional_userId
            ? response.data.usuario
            : profissional
        )
      );
    }
  };

  const Buttons = (tipoUsuario, usuario, userId) => {
    return (
      <>
        <button
          className={classes.selectButton}
          onClick={() => {
            updateStatus(tipoUsuario, usuario.status, userId);
          }}
        >
          {usuario.status == 'confirmado' ? 'Bloquear' : null}
          {usuario.status == 'pendente' ? 'Aceitar' : null}
          {usuario.status == 'recusado' ? 'Aceitar' : null}
          {usuario.status == 'bloqueado' ? 'Desbloquear' : null}
        </button>
        {usuario.status == 'pendente' ? (
          <button
            className={classes.selectButton}
            onClick={() => {
              updateStatus(tipoUsuario, 'recusar', userId);
            }}
          >
            {usuario.status == 'pendente' ? 'Recusar' : null}
          </button>
        ) : null}
      </>
    );
  };

  return (
    <>
      <div className={classes.buttonContainer}>
        <p
          className={`${classes.button} ${
            tipo == 'profissional' ? classes.selected : classes.unselected
          }`}
          onClick={() => {
            setTipo('profissional'), setDisplay('todos');
          }}
        >
          Profissional
        </p>
        <p
          className={`${classes.button} ${
            tipo == 'fornecedor' ? classes.selected : classes.unselected
          }`}
          onClick={() => {
            setTipo('fornecedor'), setDisplay('todos');
          }}
        >
          Fornecedor
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <p
          className={`${classes.button} ${
            display == 'todos' ? classes.selected : classes.unselected
          }`}
          style={{ textTransform: 'lowercase' }}
          onClick={() => {
            setDisplay('todos');
          }}
        >
          Todos
        </p>
        <p
          className={`${classes.button} ${
            display == 'confirmado' ? classes.selected : classes.unselected
          }`}
          style={{ textTransform: 'lowercase' }}
          onClick={() => {
            setDisplay('confirmado');
          }}
        >
          Confirmados
        </p>
        <p
          className={`${classes.button} ${
            display == 'pendente' ? classes.selected : classes.unselected
          }`}
          style={{ textTransform: 'lowercase' }}
          onClick={() => {
            setDisplay('pendente');
          }}
        >
          Pendentes
        </p>
        <p
          className={`${classes.button} ${
            display == 'recusado' ? classes.selected : classes.unselected
          }`}
          style={{ textTransform: 'lowercase' }}
          onClick={() => {
            setDisplay('recusado');
          }}
        >
          Recusados
        </p>
        <p
          className={`${classes.button} ${
            display == 'bloqueado' ? classes.selected : classes.unselected
          }`}
          style={{ textTransform: 'lowercase' }}
          onClick={() => {
            setDisplay('bloqueado');
          }}
        >
          Bloqueados
        </p>
      </div>
      {tipo == 'profissional' && (
        <div>
          {profissionais.sort(dynamicSort('nome')).map((profissional) =>
            (display == profissional.status || display == 'todos') && display != 'usuario' ? (
              <>
                <div style={{ display: 'flex' }}>
                  <p
                    className={classes.nomeSelect}
                    onClick={() => {
                      setDisplay('usuario');
                      setUsuario(profissional);
                    }}
                    style={{ marginRight: '30px' }}
                  >
                    {profissional.nome}
                  </p>
                  {usuarioTipo == 'pleno'
                    ? Buttons('profissional', profissional, profissional.profissional_userId)
                    : null}
                </div>
              </>
            ) : null
          )}
        </div>
      )}
      {tipo == 'fornecedor' && (
        <div>
          {fornecedores.sort(dynamicSort('nome')).map((fornecedor) =>
            (display == fornecedor.status || display == 'todos') && display !== 'usuario' ? (
              <>
                <div style={{ display: 'flex' }}>
                  <p
                    className={classes.nomeSelect}
                    onClick={() => {
                      setDisplay('usuario');
                      setUsuario(fornecedor);
                    }}
                    style={{ marginRight: '30px' }}
                  >
                    {fornecedor.nome}
                  </p>
                  {usuarioTipo == 'pleno'
                    ? Buttons('fornecedor', fornecedor, fornecedor.fornecedor_userId)
                    : null}
                </div>
              </>
            ) : null
          )}
        </div>
      )}
      {display == 'usuario' ? <Usuario usuario={usuario} /> : null}
    </>
  );
};

export default Usuarios;
