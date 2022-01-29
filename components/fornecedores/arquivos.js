import { useRef } from 'react';
import api from '../../services/api';
import axios from 'axios';

const Arquivos = ({ userId, nome, logo, setLogo }) => {
  const filesElement = useRef(null);

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const logo of filesElement.current.files) {
      dataForm.append('userId', userId);
      dataForm.append('nome', nome);
      dataForm.append('logo', logo);
    }

    const response = await fetch(`http://localhost:3001/fornecedor/fileUpload`, {
      method: 'POST',
      body: dataForm,
    });

    const data = await response.json();
    setLogo(data.id);
  };

  const removerFile = async (logo, userId) => {
    const response = await api.post(`/fornecedor/fileDelete`, {
      logoId: logo,
      userId: userId,
    });
    setLogo(null);
  };

  return (
    <>
      <h3>Logo</h3>
      {logo ? (
        <div style={{ height: '200px', width: '200px', display: 'flex', flexDirection: 'column' }}>
          <img
            style={{ height: '150px' }}
            src={`https://casa-cor.herokuapp.com/images/fornecedores/${logo}.jpg`}
            alt="BigCo Inc. logo"
          />
          <button onClick={() => removerFile(logo, userId)}>Remover Imagem</button>
        </div>
      ) : (
        <div style={{ height: '200px', width: '200px', display: 'flex', flexDirection: 'column' }}>
          <img
            style={{ height: '150px' }}
            src={`https://casa-cor.herokuapp.com/images/not-found.jpg`}
            alt="BigCo Inc. logo"
          />
          <div
            style={{ height: '200px', width: '200px', display: 'flex', flexDirection: 'column' }}
          >
            <input type="file" multiple ref={filesElement} />
            <button onClick={sendFile}>Send file</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Arquivos;
