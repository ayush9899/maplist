import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link className='nav-link' to="/">Registration</Link>
            <Link className='nav-link' to="/companyList">Company List</Link>
            <Link className='nav-link' to="/search">Company Search</Link>
           
           </Nav>
        </Container>
      </Navbar>
      
        </>
    )
}

export default Header