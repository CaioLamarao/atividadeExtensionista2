import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../LoginPage.css';

function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCpfChange = (event) => {
    const formattedValue = event.target.value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    setCpf(formattedValue);
  };

  const handleBirthdateChange = (event) => {
    const formattedValue = event.target.value.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
    setBirthdate(formattedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanedCpf = cpf.replace(/\D/g, '');
    const cleanedBirthdate = birthdate.replace(/\D/g, '');

    try {
      const response = await axios.post('http://localhost:3301/api/user/login', {
        cpf: cleanedCpf,
        birthdate: cleanedBirthdate
      });
      if (response.data.success) {
        // Armazene o nome do usuário e redirecione para a página principal
        localStorage.setItem('userName', response.data.user.name);
        navigate('/foodappmain');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Erro ao tentar fazer login: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo"/>
      <h1>Bem vindo!</h1>
      <p>Entre com seus dados</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          id="cpf"
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          className={error ? 'invalid' : ''}
          maxLength="14"
        />
        <input 
          type="text"
          id="birthdate"
          placeholder="Data de Nascimento"
          value={birthdate}
          onChange={handleBirthdateChange}
          className={error ? 'invalid' : ''}
          maxLength="10"
        />
        <button type="submit">ACESSAR</button>
      </form>
      {error && <div className="error-alert">{error}</div>}
      <a href="/reset-password">Esqueceu sua senha?</a>
    </div>
  );
}

export default LoginPage;
