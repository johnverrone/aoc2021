import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ol>
          <li>
            <Link to="/day01">Day 01</Link>
          </li>
          <li>
            <Link to="/day02">Day 02</Link>
          </li>
        </ol>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
