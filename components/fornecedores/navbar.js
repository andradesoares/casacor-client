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
  setAdicionados,
  setNaoAdicionados,
  adicionados,
  naoAdicionados,
  tableName,
  userId,
  usuarioOposto,
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const respostaConexao = async (usuarioId, usuarioOpostoId, resposta, usuarioOpostoTipo) => {
    const response = await api.post(`/${tipo}/confirmarConexao`, {
      usuarioId,
      usuarioOpostoId,
      resposta,
    });

    if (resposta == 'confirmado') {
      setAdicionados(
        adicionados.map((pessoa) =>
          pessoa[`${usuarioOpostoTipo}_userId`] ==
          response.data[`${usuarioOpostoTipo}`][`${usuarioOpostoTipo}_userId`]
            ? response.data[`${usuarioOpostoTipo}`]
            : pessoa
        )
      );
    } else if (resposta == 'recusado') {
      setNaoAdicionados([...naoAdicionados, response.data[`${usuarioOpostoTipo}`]]);
      setAdicionados(
        adicionados.filter(
          (pessoa) =>
            pessoa[`${usuarioOpostoTipo}_userId`] !==
            response.data[`${usuarioOpostoTipo}`][`${usuarioOpostoTipo}_userId`]
        )
      );
    }
  };

  const notifications = (array, usuarioOposto) => {
    return array.filter(
      (item) =>
        item[tableName][0].FornecedorProfissional.status == 'pendente' &&
        item[tableName][0].FornecedorProfissional.iniciadoPor == usuarioOposto
    ).length;
  };

  const lista = (array, usuarioOposto) => {
    return array.sort(dynamicSort('nome')).map((item) =>
      item[tableName][0].FornecedorProfissional.status == 'pendente' &&
      item[tableName][0].FornecedorProfissional.iniciadoPor == usuarioOposto ? (
        <>
          <li key={item[`${usuarioOposto}_userId`]}>
            <p>{item.nome}</p>
            <button
              onClick={() => {
                respostaConexao(
                  userId,
                  item[`${usuarioOposto}_userId`],
                  'confirmado',
                  usuarioOposto
                );
              }}
            >
              Confirmar
            </button>
            <button
              onClick={() => {
                respostaConexao(userId, item[`${usuarioOposto}_userId`], 'recusado', usuarioOposto);
              }}
            >
              Recusar
            </button>
          </li>
        </>
      ) : null
    );
  };

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
                {notifications(adicionados, usuarioOposto) > 0 && (
                  <div className={classes.counter}>{notifications(adicionados, usuarioOposto)}</div>
                )}
              </div>
              {/* <div className={classes.icon} onClick={() => setOpen(!open)}>
                <img src={Message} className="iconImg" alt="" />
              </div> */}
            </div>
            {open && notifications(adicionados, usuarioOposto) > 0 && (
              <div className={classes.notifications}>
                <ul>{lista(adicionados, usuarioOposto)}</ul>
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
