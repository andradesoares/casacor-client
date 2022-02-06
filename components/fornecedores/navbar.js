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
  setStateProfissionaisAdicionados,
  setStateProfissionaisNaoAdicionados,
  profissionaisAdicionados,
  profissionaisNaoAdicionados,
  userId,
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const respostaConexao = async (profissionalId, fornecedorId, resposta) => {
    const response = await api.post(`/fornecedor/confirmarConexao`, {
      profissionalId,
      fornecedorId,
      resposta,
    });

    if (resposta == 'confirmado') {
      setStateProfissionaisAdicionados(
        profissionaisAdicionados.map((profissional) =>
          profissional.profissional_userId == response.data.profissional.profissional_userId
            ? response.data.profissional
            : profissional
        )
      );
    } else if (resposta == 'recusado') {
      setStateProfissionaisNaoAdicionados([
        ...profissionaisNaoAdicionados,
        response.data.profissional,
      ]);
      setStateProfissionaisAdicionados(
        profissionaisAdicionados.filter(
          (profissional) =>
            profissional.profissional_userId !== response.data.profissional.profissional_userId
        )
      );
    }
  };

  const notifications = profissionaisAdicionados.filter(
    (profissional) =>
      profissional.Fornecedors[0].FornecedorProfissional.status == 'pendente' &&
      profissional.Fornecedors[0].FornecedorProfissional.iniciadoPor == 'profissional'
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
            {open && notifications > 0 && (
              <div className={classes.notifications}>
                <ul>
                  {profissionaisAdicionados.sort(dynamicSort('nome')).map((profissional) =>
                    profissional.Fornecedors[0].FornecedorProfissional.status == 'pendente' &&
                    profissional.Fornecedors[0].FornecedorProfissional.iniciadoPor ==
                      'profissional' ? (
                      <>
                        <li key={profissional.profissional_userId}>
                          <p>{profissional.nome}</p>
                          <button
                            onClick={() => {
                              respostaConexao(
                                profissional.profissional_userId,
                                userId,
                                'confirmado'
                              );
                            }}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => {
                              respostaConexao(profissional.profissional_userId, userId, 'recusado');
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
