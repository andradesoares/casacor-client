import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import axios from 'axios';

import classes from './arquivos.module.scss';

const Arquivos = ({ userId, nome, logo, setLogo, usuario }) => {
  const filesElement = useRef(null);
  const [fileLength, setFileLength] = useState(0);
  const [logoImage, setLogoImage] = useState();

  const sendFile = async () => {
    const dataForm = new FormData();
    dataForm.append('userId', userId);
    dataForm.append('nome', nome);
    dataForm.append('logo', logoImage);

    const response = await fetch(`https://casa-cor.herokuapp.com/${usuario}/fileUpload`, {
      method: 'POST',
      body: dataForm,
    });

    const data = await response.json();
    setLogo(data.id);
  };

  const handleClick = (event) => {
    filesElement.current.click();
  };
  const handleChange = (event) => {
    setLogoImage(event.target.files[0]);
    setFileLength(filesElement?.current?.files?.length);
  };

  const removerFile = async (logo, userId) => {
    const response = await api.post(`/${usuario}/fileDelete`, {
      logoId: logo,
      userId: userId,
    });
    setLogo(null);
    setFileLength(0);
  };

  const isEnableSignUp = () => {
    return fileLength > 0;
  };

  return (
    <>
      <div className={classes.container}>
        <h3>Logo</h3>
        {logo ? (
          <div
            style={{ height: '200px', width: '200px', display: 'flex', flexDirection: 'column' }}
          >
            <img
              style={{ height: '150px', marginBottom: '10px' }}
              src={`https://casa-cor.herokuapp.com/images/${usuario}/${logo}.jpg`}
              alt="BigCo Inc. logo"
            />
            <button
              className={`${classes.button} ${classes.buttonEnabled}`}
              onClick={() => removerFile(logo, userId)}
            >
              Remover Imagem
            </button>
          </div>
        ) : (
          <div
            style={{ height: '200px', width: '200px', display: 'flex', flexDirection: 'column' }}
          >
            <img
              style={{ height: '150px', marginBottom: '10px' }}
              src={`https://casa-cor.herokuapp.com/images/not-found.jpg`}
              alt="BigCo Inc. logo"
            />
            {fileLength == 0 && (
              <>
                <button
                  style={{ marginBottom: '10px' }}
                  className={`${classes.button} ${classes.buttonEnabled}`}
                  onClick={(event) => {
                    handleClick(event);
                  }}
                >
                  Carregar arquivo
                </button>
                <input
                  type="file"
                  multiple
                  ref={filesElement}
                  name="file"
                  onChange={(event) => handleChange(event)}
                  style={{ display: 'none' }}
                />
              </>
            )}

            <button
              className={`${classes.button} ${
                isEnableSignUp() ? classes.buttonEnabled : classes.buttonDisabled
              }`}
              disabled={isEnableSignUp() ? false : true}
              onClick={() => {
                sendFile();
              }}
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Arquivos;
