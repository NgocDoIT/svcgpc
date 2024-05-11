import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý đăng nhập
    console.log('Đăng nhập với username:', username, 'và password:', password);
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form>
        <div>
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>Đăng nhập</button>
      </form>
    </div>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Xử lý đăng ký
    console.log('Đăng ký với username:', username, 'và password:', password);
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form>
        <div>
          <label htmlFor="reg-username">Tên đăng nhập:</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reg-password">Mật khẩu:</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegister}>Đăng ký</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
