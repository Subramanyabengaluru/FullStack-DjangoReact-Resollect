import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from './Home';
import AddStudent from './AddStudent';
import GetStudent from './GetStudent';
import UpdateStudent from './UpdateStudent';
import FilteredStudents from './FilteredStudents';

function App() {

  return (
    
    <BrowserRouter>
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fw-bolder">
            <Link className="navbar-brand" to='/home' >Students App</Link>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to="/add" >Add Student</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/get" >View Student</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/filter" >Filter</Link>
              </li>
            </ul>
          </nav>
      
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/add' element={<AddStudent/>} />
          <Route path='/get' element={<GetStudent/>} />
          <Route path='/update/:id' element={<UpdateStudent/>} />
          <Route path='/filter' element={<FilteredStudents/>} />
        </Routes>
      </div>
    </BrowserRouter>
    
    
  );
}


export default App;
