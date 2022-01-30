import { useState } from 'react';
import Link from 'next/link';

import { dynamicSort } from '../../services/helpers';
import Usuario from './usuario';
import api from '../../services/api';

const Usuarios = ({
  usuarioTipo,
  adminId,
  profissionais,
  fornecedores,
  setFornecedores,
  setProfissionais,
}) => {
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
          style={{ minWidth: '120px' }}
          onClick={() => {
            updateStatus(tipoUsuario, usuario.status, userId);
          }}
        >
          {usuario.status == 'confirmado' ? 'Bloquear Usuario' : null}
          {usuario.status == 'pendente' ? 'Aceitar Usuario' : null}
          {usuario.status == 'recusado' ? 'Aceitar Usuario' : null}
          {usuario.status == 'bloqueado' ? 'Desbloquear Usuario' : null}
        </button>
        {usuario.status == 'pendente' ? (
          <button
            onClick={() => {
              updateStatus(usuario, 'recusar', usuario.profissional_userId);
            }}
          >
            {usuario.status == 'pendente' ? 'Recusar Usuario' : null}
          </button>
        ) : null}
      </>
    );
  };

  return (
    <>
      <h3>Usuarios</h3>
      <div>
        <button
          type="button"
          onClick={() => {
            setDisplay('todos');
          }}
        >
          Todos
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplay('confirmado');
          }}
        >
          Confirmados
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplay('pendente');
          }}
        >
          Pendentes
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplay('recusado');
          }}
        >
          Recusados
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplay('bloqueado');
          }}
        >
          Bloqueados
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', marginRight: '30px' }}>
          {profissionais.sort(dynamicSort('nome')).map((profissional) =>
            (display == profissional.status || display == 'todos') && display != 'usuario' ? (
              <>
                <h4>Profissionais</h4>

                <div style={{ display: 'flex' }}>
                  <p
                    onClick={() => {
                      setDisplay('usuario');
                      setUsuario(profissional);
                    }}
                    style={{ marginRight: '30px' }}
                  >
                    {profissional.nome}
                  </p>
                  <p style={{ minWidth: '100px', textTransform: 'capitalize' }}>
                    {profissional.status}
                  </p>
                  {usuarioTipo == 'pleno'
                    ? Buttons('profissional', profissional, profissional.profissional_userId)
                    : null}
                </div>
              </>
            ) : null
          )}
        </div>
        <div style={{ flexGrow: '1' }}>
          {fornecedores.sort(dynamicSort('nome')).map((fornecedor) =>
            (display == fornecedor.status || display == 'todos') && display !== 'usuario' ? (
              <>
                <h4>Fornecedores</h4>

                <div style={{ display: 'flex' }}>
                  <p
                    onClick={() => {
                      setDisplay('usuario');
                      setUsuario(fornecedor);
                    }}
                    style={{ marginRight: '30px' }}
                  >
                    {fornecedor.nome}
                  </p>
                  <p style={{ minWidth: '100px', textTransform: 'capitalize' }}>
                    {fornecedor.status}
                  </p>
                  {usuarioTipo == 'pleno'
                    ? Buttons('fornecedor', fornecedor, fornecedor.fornecedor_userId)
                    : null}
                </div>
              </>
            ) : null
          )}
          {display == 'usuario' ? <Usuario usuario={usuario} /> : null}
        </div>
      </div>
    </>
  );
};

export default Usuarios;
