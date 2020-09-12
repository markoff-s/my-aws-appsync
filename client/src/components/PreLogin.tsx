import React from 'react';
import Card from '../styled-components/Card';
import Button from '../styled-components/Button';
import { Link } from 'react-router-dom';

const PreLogin = () => (
  <Card>
    <h2>Welcome to the app</h2>
    <p>
      The central place for creating and managing names and IDs for our artists, participants,
      writers, producers, engineers, musicians, and other contributors.
    </p>
    <Link to="/search">
      <Button>LOGIN</Button>
    </Link>
    <p>
      Problems logging in? <a href="#">Contact us</a>
    </p>
  </Card>
);

export default PreLogin;
