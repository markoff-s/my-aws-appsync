import React from 'react';
import Card from '../../styled-components/Card';
import Button from '../../styled-components/Button';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreLogin: React.FC<Props> = ({ setIsLoggedIn }) => {
  return (
    <Card>
      <h2>Welcome to the app</h2>
      <p>
        The central place for creating and managing names and IDs for our artists, participants,
        writers, producers, engineers, musicians, and other contributors.
      </p>

      <Button onClick={() => setIsLoggedIn(true)}>LOGIN</Button>
      <p>
        Problems logging in? <a href="#">Contact us</a>
      </p>
    </Card>
  );
};

export default PreLogin;
