import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { dynamicSort } from '../../services/helpers';
import api from '../../services/api';
import { signOut } from '../../services/auth';
import classes from './navbar.module.scss';

import notification from '../../images/icons/notification.png';

function NavBar({
  usuario,
  tipo,
  setStateFornecedoresAdicionados,
  setStateFornecedoresNaoAdicionados,
  fornecedoresAdicionados,
  fornecedoresNaoAdicionados,
  userId,
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const respostaConexao = async (profissionalId, fornecedorId, resposta) => {
    const response = await api.post(`/profissional/confirmarConexao`, {
      profissionalId,
      fornecedorId,
      resposta,
    });

    if (resposta == 'confirmado') {
      setStateFornecedoresAdicionados(
        fornecedoresAdicionados.map((fornecedor) =>
          fornecedor.fornecedor_userId == response.data.fornecedor.fornecedor_userId
            ? response.data.fornecedor
            : fornecedor
        )
      );
    } else if (resposta == 'recusado') {
      setStateFornecedoresNaoAdicionados([...fornecedoresNaoAdicionados, response.data.fornecedor]);
      setStateFornecedoresAdicionados(
        fornecedoresAdicionados.filter(
          (fornecedor) =>
            fornecedor.fornecedor_userId !== response.data.fornecedor.fornecedor_userId
        )
      );
    }
  };

  const notifications = fornecedoresAdicionados.filter(
    (fornecedor) =>
      fornecedor.Profissionals[0].FornecedorProfissional.status == 'pendente' &&
      fornecedor.Profissionals[0].FornecedorProfissional.iniciadoPor == 'fornecedor'
  ).length;

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.logo}>LOGO</h1>
        <h2 className={classes.tipoUsuario}>{tipo}</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              borderRight: '1px solid black',
              padding: '0 10px',
              height: '30px',
              margin: '0',
            }}
          >
            <p style={{ display: 'flex', alignItems: 'center', margin: '0 5px 0 0' }}>
              Seja bem-vindo
            </p>
            <p
              style={{ display: 'flex', alignItems: 'center', margin: '0' }}
              className={classes.usuario}
            >
              {usuario.nome}
            </p>
            <div className={classes.icons}>
              <div className={classes.icon} onClick={() => setOpen(!open)}>
                <Image src={notification} className={classes.iconImg} alt="" />
                {notifications > 0 && <div className={classes.counter}>{notifications}</div>}
              </div>
              {/* <div className={classes.icon} onClick={() => setOpen(!open)}>
                <img src={Message} className="iconImg" alt="" />
              </div> */}
            </div>
            {open && (
              <div className={classes.notifications}>
                <ul>
                  {fornecedoresAdicionados.sort(dynamicSort('nome')).map((fornecedor) =>
                    fornecedor.Profissionals[0].FornecedorProfissional.status == 'pendente' &&
                    fornecedor.Profissionals[0].FornecedorProfissional.iniciadoPor ==
                      'fornecedor' ? (
                      <>
                        <li key={fornecedor.fornecedor_userId}>
                          <p>{fornecedor.nome}</p>
                          <button
                            onClick={() => {
                              respostaConexao(userId, fornecedor.fornecedor_userId, 'confirmado');
                            }}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => {
                              respostaConexao(userId, fornecedor.fornecedor_userId, 'recusado');
                            }}
                          >
                            Recusar
                          </button>
                        </li>
                      </>
                    ) : null
                  )}
                </ul>
              </div>
            )}
          </div>

          <p
            style={{ paddingLeft: '10px' }}
            className={classes.logoutButton}
            onClick={() => {
              signOut(router.push);
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </>
  );
}

export default NavBar;
