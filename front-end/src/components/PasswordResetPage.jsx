import React from 'react';
import '../LoginPage.css'; // Reutilize o CSS para consistência

function PasswordResetPage() {
  return (
    <div className="login-container">
      <img src="/images/curitiba-logo.png" alt="Curitiba Logo" className="logo"/>
      <h1>Nova senha enviada!</h1>
      <p>Nova senha enviada para o e-mail cadastrado!</p>
      <button onClick={() => window.history.back()}>Voltar para a tela de login</button>
    </div>
  );
}

export default PasswordResetPage;
