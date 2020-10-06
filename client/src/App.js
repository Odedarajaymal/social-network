import React,{Component} from 'react';
import Router from './Router'
import {BrowserRouter} from 'react-router-dom'

class App extends Component {
render() {
  return (
    <div>
      <BrowserRouter>
           <Router/>
      </BrowserRouter>
     
    </div>
  )
}

}

export default App;
