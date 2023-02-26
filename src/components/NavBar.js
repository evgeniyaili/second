import React from "react";
import "./styles.css";
import { Nav, Navbar, NavLink} from "react-bootstrap";
//import { ReactComponent as Logo } from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import CategoryBar from "./CategoryBar";

export default function App() {
  return (
    <Navbar collapseOnSelect expand={false} className="navbar" fixed="top">
      <NavLink  href='/' className={'navlink nohover'}>
        {/* <Logo
          alt=""
          width="30"
          height="30"
          className="d-inline-block align-top"
        /> */}
        <span>Shop</span>
      </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
                <CategoryBar/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}










// import { Navbar, Nav } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'
// import { AppContext } from './AppContext.js'
// import { useContext } from 'react'
// import { observer } from 'mobx-react-lite'
// import CategoryBar from './CategoryBar.js'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles.css";


// const NavBar = observer(() => {
//     const { user } = useContext(AppContext)
//     return (
//         <Navbar expand={false} collapseOnSelect fixed="top" className="navbar" >
//                 <NavLink className={'navlink nohover'} to='/'>
//                     {/* <Logo
//                         alt=""
//                         width="30"
//                         height="30"
//                         className="d-inline-block align-top"
//                     /> */}
//                         <span>Shop</span>
//                 </NavLink>
//                         <Navbar.Toggle  className='toggle'  >
//                             <Navbar.Collapse  >
                                
//                                     <Nav  className='a_navbar'>
//                                         <CategoryBar/>
//                                     </Nav>
                                
                               
//                             </Navbar.Collapse>
//                         </Navbar.Toggle>
//                     {user.isAdmin && (
//                         <NavLink to="/admin" className="nav-link"> Панель управления </NavLink>
//                     )}
//             </Navbar>
//     )
// })

// export default NavBar