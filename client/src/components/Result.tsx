import React from 'react';

interface Props {
  name: string;
  format: string;
  country: string;
  comments: string;
  onClick: () => void;
}

const Result: React.FC<Props> = ({ name, format, country, comments, onClick }) => {
  return (
    <div className="result" onClick={onClick}>
      <p>{name}</p>
      <p>{format}</p>
      <p>{country}</p>
      <p>{comments}</p>
    </div>
  );
};

export default Result;
