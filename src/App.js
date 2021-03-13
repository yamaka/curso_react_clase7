import logo from './logo.svg';
import './App.css';

import Header from './Header';
import Cursos from './Cursos';
import React from 'react';


class App extends React.Component {
  render(){
      return (
      <div className="App">
        <Header/>
        <Cursos/>
      </div>
    );
  }
}

export default App;
