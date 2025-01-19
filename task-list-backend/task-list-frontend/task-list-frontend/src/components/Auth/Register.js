import React, { useState } from 'react';
import { registerUser  } from '../../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccess(false); 

        try {
            await registerUser ({ username, password });
            setSuccess(true);
            setUsername(''); 
            setPassword('');
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            setError('Ошибка при регистрации. Попробуйте еще раз.'); 
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
            {success && <p style={{ color: 'green' }}>Регистрация прошла успешно!</p>} {/* Отображение успешного сообщения */}
        </div>
    );
};

export default Register;