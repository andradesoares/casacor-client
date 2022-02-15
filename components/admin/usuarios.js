import { useState } from 'react';
import Link from 'next/link';

import { dynamicSort } from '../../services/helpers';
import Usuario from './usuario';
import api from '../../services/api';
import Button from '../button';

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

  const Buttons = (tipoUsuario, status, userId) => {
    return (
      <>
        <Button
          label={
            status == 'confirmado'
              ? 'Bloquear'
              : status == 'pendente'
              ? 'Aceitar'
              : status == 'recusado'
              ? 'Aceitar'
              : status == 'bloqueado'
              ? 'Desbloquear'
              : null
          }
          onClick={() => {
            updateStatus(tipoUsuario, status, userId);
          }}
          disabled={false}
        />
        {status == 'pendente' ? (
          <Button
            label={status == 'pendente' ? 'Recusar' : null}
            onClick={() => {
              updateStatus(tipoUsuario, 'recusar', userId);
            }}
            disabled={false}
          />
        ) : null}
      </>
    );
  };

  const status = (status) => {
    return (
      <p
        className={`${classes.button} ${display == status ? classes.selected : classes.unselected}`}
        onClick={() => {
          setDisplay(status);
        }}
        style={{ textTransform: 'lowercase' }}
      >
        {status}
      </p>
    );
  };

  const displayLista = (array, tipo) => {
    return (
      <div>
        {array.sort(dynamicSort('nome')).map((item) =>
          (display == item.status || display == 'todos') && display != 'usuario' ? (
            <>
              <div style={{ display: 'flex' }}>
                <p
                  className={classes.nomeSelect}
                  onClick={() => {
                    setDisplay('usuario');
                    setUsuario(item);
                  }}
                  style={{ marginRight: '30px' }}
                >
                  {item.nome}
                </p>
                {usuarioTipo == 'pleno' ? Buttons(tipo, item.status, item[`${tipo}_userId`]) : null}
              </div>
            </>
          ) : null
        )}
      </div>
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
        {status('todos')}
        {status('confirmado')}
        {status('pendente')}
        {status('recusado')}
        {status('bloqueado')}
      </div>
      {tipo == 'profissional' && displayLista(profissionais, tipo)}
      {tipo == 'fornecedor' && displayLista(fornecedores, tipo)}
      {display == 'usuario' ? <Usuario usuario={usuario} /> : null}
    </>
  );
};

export default Usuarios;
