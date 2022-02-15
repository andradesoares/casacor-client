import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { dynamicSort } from '../../services/helpers';
import api from '../../services/api';
import ReactExport from 'react-export-excel';
import classes from './planilhas.module.scss';
import TrocarUsuario from '../trocarUsuario';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Planilhas = ({ fornecedores, profissionais }) => {
  const [display, setDisplay] = useState('profissional');

  // const displayPlanilha = (array, tipo) => {
  //   return (
  //     <>
  //       <div>
  //         <h4>{tipo}</h4>
  //         <table id="table-to-xls" className={classes.table}>
  //           <tr>
  //             {arrayKeys(array).map((item) => (
  //               <>
  //                 <th>{item}</th>
  //               </>
  //             ))}
  //           </tr>
  //           {array.sort(dynamicSort('nome')).map((item) => (
  //             <tr>
  //               <>
  //                 {arrayKeys(array).map((key) => (
  //                   <td>{console.log(item[key])}</td>
  //                 ))}
  //               </>
  //             </tr>
  //           ))}
  //         </table>
  //         <ExcelFile
  //           element={<button className={classes.downloadButton}>Baixar Planilha</button>}
  //           filename={`Tabela_${tipo}`}
  //         >
  //           <ExcelSheet data={array} name={tipo}>
  //             <ExcelColumn label="Nome" value="nome" />
  //             <ExcelColumn label="Nome escritorio" value="nomeEscritorio" />
  //             <ExcelColumn label="Email" value="email" />
  //           </ExcelSheet>
  //         </ExcelFile>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <TrocarUsuario setUsuario={setDisplay} usuario={display} />
      <div style={{ display: 'flex' }}>
        {display == 'profissional' ? (
          <>
            <div style={{ overflowX: 'auto' }}>
              <h4>Profissionais</h4>
              <table id="table-to-xls" className={classes.table}>
                <tr>
                  <th>Nome</th>
                  <th>Nome do escritório</th>
                  <th>Email</th>
                </tr>
                {profissionais.sort(dynamicSort('nome')).map((profissional) => (
                  <tr>
                    <td>{profissional.nome}</td>
                    <td>{profissional.nomeEscritorio}</td>
                    <td>{profissional.email}</td>
                  </tr>
                ))}
              </table>
              <ExcelFile
                element={<button className={classes.downloadButton}>Baixar Planilha</button>}
                filename="Tabela_profissionais"
              >
                <ExcelSheet data={profissionais} name="Employees">
                  <ExcelColumn label="Nome" value="nome" />
                  <ExcelColumn label="Nome escritorio" value="nomeEscritorio" />
                  <ExcelColumn label="Email" value="email" />
                </ExcelSheet>
              </ExcelFile>
            </div>
          </>
        ) : null}
        {display == 'fornecedor' ? (
          <div style={{ overflowX: 'auto' }}>
            <h4>Fornecedores</h4>
            <table id="table-to-xls" className={classes.table}>
              <tr>
                <th>Nome</th>
                <th>Descricao Produto</th>
                <th>Email</th>
              </tr>
              {fornecedores.sort(dynamicSort('nome')).map((fornecedor) => (
                <tr>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.descricaoProduto}</td>
                  <td>{fornecedor.email}</td>
                </tr>
              ))}
            </table>
            <ExcelFile
              element={<button className={classes.downloadButton}>Baixar Planilha</button>}
              filename="Tabela_profissionais"
            >
              <ExcelSheet data={fornecedores} name="Employees">
                <ExcelColumn label="Nome" value="nome" />
                <ExcelColumn label="Nome escritorio" value="descricaoProduto" />
                <ExcelColumn label="Email" value="email" />
              </ExcelSheet>
            </ExcelFile>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Planilhas;
