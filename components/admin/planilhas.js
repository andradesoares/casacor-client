import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { dynamicSort } from '../../services/helpers';
import classes from './home.module.css';
import api from '../../services/api';
import ReactExport from 'react-export-excel';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Planilhas = ({ fornecedores, profissionais }) => {
  const [display, setDisplay] = useState('profissionais');

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            setDisplay('profissionais');
          }}
        >
          Profissionais
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplay('fornecedores');
          }}
        >
          Fornecedores
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        {display == 'profissionais' ? (
          <>
            <div>
              <h4>Profissionais</h4>
              <table
                id="table-to-xls"
                style={{ border: '1px solid black', borderCollapse: 'collapse' }}
              >
                <tr style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                  <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>Nome</th>
                  <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    Nome do escritório
                  </th>
                  <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>Email</th>
                </tr>
                {profissionais.sort(dynamicSort('nome')).map((profissional) => (
                  <tr style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                      {profissional.nome}
                    </td>
                    <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                      {profissional.nomeEscritorio}
                    </td>
                    <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                      {profissional.email}
                    </td>
                  </tr>
                ))}
              </table>
              <ExcelFile filename="Tabela_profissionais">
                <ExcelSheet data={profissionais} name="Employees">
                  <ExcelColumn label="Nome" value="nome" />
                  <ExcelColumn label="Nome escritorio" value="nomeEscritorio" />
                  <ExcelColumn label="Email" value="email" />
                </ExcelSheet>
              </ExcelFile>
            </div>
          </>
        ) : null}
        {display == 'fornecedores' ? (
          <div>
            <h4>Fornecedores</h4>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
              <tr style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>Nome</th>
                <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                  Descricao Produto
                </th>
                <th style={{ border: '1px solid black', borderCollapse: 'collapse' }}>Email</th>
              </tr>
              {fornecedores.sort(dynamicSort('nome')).map((fornecedor) => (
                <tr style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                  <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    {fornecedor.nome}
                  </td>
                  <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    {fornecedor.descricaoProduto}
                  </td>
                  <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    {fornecedor.email}
                  </td>
                </tr>
              ))}
            </table>
            <ExcelFile filename="Tabela_profissionais">
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
