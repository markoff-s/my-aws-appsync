import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  format: string;
  country: string;
  comments: string;
  id: number;
  type: string;
}

const Result: React.FC<Props> = ({ name, format, country, comments, id, type }) => {
  return (
    <Link to={`${type}/${id}`}>
      <div className="result">
        <p>{name}</p>
        <p>{format}</p>
        <p>{country}</p>
        <p>{comments}</p>
      </div>
    </Link>
  );
};

export default Result;
