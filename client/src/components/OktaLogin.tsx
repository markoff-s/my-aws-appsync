import React, { useState } from 'react';
import Card from '../styled-components/Card';
import Input from '../styled-components/Input';
import Button from '../styled-components/Button';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const OktaLogin: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dummyData = {
    username: 'zac',
    password: '123',
  };

  const handleLogin = () => {
    if (username === dummyData.username && password === dummyData.password) {
      setIsLoggedIn(true);
    }
  };
  return (
    <Card>
      <h2>Login</h2>
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Card>
  );
};

export default OktaLogin;
