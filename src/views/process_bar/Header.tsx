import React from 'react';

const Header = () => {
  console.log('render header');
  return <h1 className='process_header'>Process Bar Demo</h1>;
};

export default React.memo(Header);
