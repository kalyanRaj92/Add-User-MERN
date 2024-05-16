import {BrowserRouter, Routes,Route} from 'react-router-dom'
import './App.css';
import GetUser from './components/GetUser';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GetUser/>}/>
          <Route path='/add' element={<AddUser/>}/>
          <Route path='/edit/:id' element={<UpdateUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
