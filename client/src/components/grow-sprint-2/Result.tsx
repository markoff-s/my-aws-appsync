import React from 'react';

interface Props {
  name: string;
  type: string;
  country: string;
  comments: string;
  onClick: () => void;
}

const Result: React.FC<Props> = ({ name, type, country, comments, onClick }) => {
  return (
    <div className="result" onClick={onClick}>
      <p>{name}</p>
      <p>{type}</p>
      <p>{country}</p>
      <p>{comments}</p>
    </div>
  );
};

export default Result;
