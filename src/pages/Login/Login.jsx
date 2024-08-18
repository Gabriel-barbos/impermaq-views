import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import LoginImg from './loginImg.png'

function AdminLogin() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const usuarioCorreto = 'admin';
        const senhaCorreta = '1234';

        if (usuario === usuarioCorreto && senha === senhaCorreta) {
            alert('Login bem-sucedido!');
            navigate('/admin'); // Redirecionar para a página Admin
        } else {
            setError('Usuário ou senha incorretos!');
        }
    };

    return (
        <div className="login-page">

       
        <div className="container">
            <div className="left">
                <h2>Faça login <br /> E acesse seu sistema</h2>
                <img src={LoginImg} alt="login img" />
            </div>
            <div className="right">
                <form id="loginForm" onSubmit={handleSubmit}>
                    <h2>login</h2>
                    <div id="error" className="error">{error}</div>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="usuário"
                        required
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="senha"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <input type="submit" value="Entrar" />
                </form>
            </div>
        </div>
        </div>
    );
}

export default AdminLogin;
