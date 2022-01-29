import { useState } from 'react';
import api from '../../services/api';

function Ambiente({ ambiente, userId, setAmbiente }) {
  const [editarAmbiente, setEditarAmbiente] = useState(false);
  const [nome, setNome] = useState(ambiente?.nome);
  const [aguaDeChuva, setAguaDeChuva] = useState(ambiente?.Sustentabilidade.aguaDeChuva);
  const [materialReciclavel, setMaterialReciclavel] = useState(
    ambiente?.Sustentabilidade.materialReciclavel
  );
  const [energiaSolar, setEnergiaSolar] = useState(ambiente?.Sustentabilidade.energiaSolar);

  const editarAmbienteHandler = async (event) => {
    event.preventDefault();
    const response = await api.post(`/profissional/editarAmbiente`, {
      nome,
      userId,
      aguaDeChuva,
      materialReciclavel,
      energiaSolar,
    });
    setEditarAmbiente(false);
    setAmbiente(response.data.ambiente);
  };
  const checklist = () => {
    return (
      <div>
        <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Sustentabilidade</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <input
              onClick={() => {
                sustentabilidadeHandler(aguaDeChuva, setAguaDeChuva);
              }}
              type="checkbox"
              value={aguaDeChuva}
              name="gender"
              defaultChecked={aguaDeChuva}
            />{' '}
            Agua de chuva
          </div>
          <div>
            <input
              onClick={() => {
                sustentabilidadeHandler(materialReciclavel, setMaterialReciclavel);
              }}
              type="checkbox"
              value={materialReciclavel}
              name="gender"
              defaultChecked={materialReciclavel}
            />{' '}
            Materiais Reciclaveis
          </div>
          <div>
            <input
              onClick={() => {
                sustentabilidadeHandler(energiaSolar, setEnergiaSolar);
              }}
              type="checkbox"
              value={energiaSolar}
              name="gender"
              defaultChecked={energiaSolar}
            />{' '}
            Energia Solar
          </div>
        </div>
      </div>
    );
  };

  const sustentabilidadeHandler = (value, set) => {
    set(!value);
  };

  return (
    <>
      {editarAmbiente ? (
        <>
          <form onSubmit={editarAmbienteHandler}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Nome do Ambiente</p>
              <div>
                <input
                  placeholder="Nome"
                  type="text"
                  id="nome"
                  required
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>
            </div>
            {checklist()}
            <div>
              <button>Salvar</button>
            </div>
          </form>
          <button
            type="button"
            onClick={() => {
              setEditarAmbiente(false);
              setNome(ambiente?.nome);
              setAguaDeChuva(ambiente?.Sustentabilidade.aguaDeChuva);
              setMaterialReciclavel(ambiente?.Sustentabilidade.materialReciclavel);
              setEnergiaSolar(ambiente?.Sustentabilidade.energiaSolar);
            }}
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Nome do Ambiente</p>
            <div>{nome}</div>
          </div>
          {checklist()}

          <div>
            <button
              type="button"
              onClick={() => {
                setEditarAmbiente(true);
              }}
            >
              Editar
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Ambiente;
