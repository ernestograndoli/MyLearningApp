import { Outlet, Link } from 'react-router-dom';
import './App.css';
import styled from "styled-components";

const Nav = styled.nav`
    background-color: #000;
    color: #fff;
    width: 100%;
    height: 30px;
    margin: 20px 0px 20px 0px;
`;

function App() {
  return (
    <div className="App">
      <Nav>
        <Link to="/news" style={{ color: "#fff" }}>News | </Link>
        <Link to="/about" style={{ color: "#fff" }}>About</Link>
      </Nav>
      <Outlet />
    </div>
  );
}

export default App;
