import { useState } from 'react';

import classes from './mensagem.module.scss';
import api from '../../services/api';
import Button from '../button';
import Input from '../input';
import TrocarUsuario from '../trocarUsuario';

const Mensagem = ({ adminId, mensagens, setMensagens, tipo }) => {
  const [count, setCount] = useState(1500);
  const [display, setDisplay] = useState('mensagens');
  const [message, setMessage] = useState('');
  const [titulo, setTitulo] = useState('');
  const [fornecedores, setFornecedores] = useState(false);
  const [profissionais, setProfissionais] = useState(false);
  const [error, setError] = useState('');

  const enviarMensagem = async () => {
    try {
      const response = await api.post(`/admin/enviarMensagem`, {
        userId: adminId,
        destinatario:
          fornecedores && profissionais
            ? 'todos'
            : fornecedores
            ? 'fornecedores'
            : profissionais
            ? 'profissionais'
            : null,
        mensagem: message,
        titulo: titulo,
      });

      if (response.data.message == 'Mensagem enviada') {
        setDisplay('mensagens');
        setMensagens([response.data.mensagem, ...mensagens]);
        setTitulo('');
        setMessage('');
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const disabledButton = () => {
    return message == '' || titulo == '' || (fornecedores == false && profissionais == false);
  };

  const destinatarios = (value, set) => {
    set(!value);
  };

  const characterCount = (event) => {
    var input = event.target.value;
    setCount(1500 - input.length);
  };

  const cancelarmensagem = (event) => {
    setDisplay('mensagens');
    setTitulo('');
    setMessage('');
    setCount(1500);
  };

  return (
    <>
      {display == 'mensagens' ? (
        <>
          {tipo == 'pleno' ? (
            <Button
              label="Nova"
              disabled={false}
              onClick={() => {
                setDisplay('nova');
              }}
            />
          ) : null}
          {mensagens.map((mensagem) => {
            return (
              <div>
                <h3>{mensagem.titulo}</h3>
                <p>{mensagem.mensagem}</p>
                <p style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                  Para: {mensagem.destinatario}
                </p>
                <p>{new Date(mensagem.createdAt).toLocaleString()}</p>
              </div>
            );
          })}
        </>
      ) : null}
      {display == 'nova' ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            placeholder="Titulo"
            type="text"
            label="Titulo"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
          <label htmlFor="message">Menssagem</label>
          <textarea
            style={{ resize: 'none', height: '200px', margin: '10px 0' }}
            value={message}
            name="message"
            onChange={(event) => {
              characterCount(event);
              setMessage(event.target.value);
            }}
          />
          <p>{count}</p>
          <h4 style={{ margin: '20px 0 0 0' }}>Destinatários</h4>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <input
                onClick={() => {
                  destinatarios(profissionais, setProfissionais);
                }}
                type="checkbox"
                value={profissionais}
                defaultChecked={profissionais}
              />{' '}
              Profissionais
            </div>
            <div>
              <input
                onClick={() => {
                  destinatarios(fornecedores, setFornecedores);
                }}
                type="checkbox"
                value={fornecedores}
                defaultChecked={fornecedores}
              />{' '}
              Fornecedores
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <Button
              label="Enviar"
              disabled={disabledButton()}
              onClick={() => {
                enviarMensagem();
              }}
            />
            <Button
              label="Cancelar"
              disabled={false}
              onClick={() => {
                cancelarmensagem();
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Mensagem;
