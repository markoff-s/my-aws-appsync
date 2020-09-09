import React from 'react';

interface Props {
  name: string;
  type: string;
  country: string;
  comments: string;
}

const Result: React.FC<Props> = ({ name, type, country, comments }) => {
  return (
    <div className="result">
      <p>{name}</p>
      <p>{type}</p>
      <p>{country}</p>
      <p>{comments}</p>
    </div>
  );
};

export default Result;
