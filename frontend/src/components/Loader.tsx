import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <FadeLoader color="#445ebf" speedMultiplier={1.2} />
    </div>
  );
};

export default Loader;