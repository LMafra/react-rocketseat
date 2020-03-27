import React, {useState} from 'react';
import {Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, SetTitle] = useState();
  const [description, SetDescription] = useState();
  const [value, SetValue] = useState();
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try{
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }

  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logo"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar ao perfil
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do Caso"
            value={title}
            onChange={e => SetTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => SetDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em Reais"
            value={value}
            onChange={e => SetValue(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}