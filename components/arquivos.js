import { useRef, useState } from 'react';
import api from '../services/api';

import classes from './arquivos.module.scss';
import Button from './button';

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

  const disabledButton = () => {
    return fileLength == 0;
  };

  return (
    <>
      <div className={classes.container}>
        {logo ? (
          <>
            <h3>Logo</h3>
            <div>
              <img
                style={{ height: '150px', marginBottom: '10px' }}
                src={`https://casa-cor.herokuapp.com/images/${usuario}/${logo}.jpg`}
                alt="BigCo Inc. logo"
              />
              <Button
                label="Remover Imagem"
                onClick={() => removerFile(logo, userId)}
                disabled={false}
              />
            </div>
          </>
        ) : (
          <div className={classes.arquivos}>
            <div>
              <h3>Logo</h3>
              <img
                style={{ height: '150px', marginBottom: '10px' }}
                src={`https://casa-cor.herokuapp.com/images/not-found.jpg`}
                alt="BigCo Inc. logo"
              />
              {fileLength == 0 && (
                <>
                  <Button
                    label="Carregar arquivo"
                    onClick={(event) => {
                      handleClick(event);
                    }}
                    disabled={false}
                  />
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
              <Button
                label="Enviar"
                onClick={() => {
                  sendFile();
                }}
                disabled={disabledButton()}
              />
            </div>

            <div>
              <h3>Logo</h3>
              <img
                style={{ height: '150px', marginBottom: '10px' }}
                src={`https://casa-cor.herokuapp.com/images/not-found.jpg`}
                alt="BigCo Inc. logo"
              />
              {fileLength == 0 && (
                <>
                  <Button
                    label="Carregar arquivo"
                    onClick={(event) => {
                      handleClick(event);
                    }}
                    disabled={false}
                  />
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
              <Button
                label="Enviar"
                onClick={() => {
                  sendFile();
                }}
                disabled={disabledButton()}
              />
            </div>

            <div>
              <h3>Logo</h3>
              <img
                style={{ height: '150px', marginBottom: '10px' }}
                src={`https://casa-cor.herokuapp.com/images/not-found.jpg`}
                alt="BigCo Inc. logo"
              />
              {fileLength == 0 && (
                <>
                  <Button
                    label="Carregar arquivo"
                    onClick={(event) => {
                      handleClick(event);
                    }}
                    disabled={false}
                  />
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
              <Button
                label="Enviar"
                onClick={() => {
                  sendFile();
                }}
                disabled={disabledButton()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Arquivos;
