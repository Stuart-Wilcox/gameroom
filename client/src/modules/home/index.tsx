import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  
}

const HomePage: React.FC<IProps> = (props: IProps) => {
  const {
    
  } = props;
  
  return (
    <>
      Home Page
      <Link to='/login'>Login</Link>
    </>
  );
}

export default HomePage;
