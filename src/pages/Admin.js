import { Container, Button, Navbar, Nav, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import { NavLink } from 'react-router-dom'
import "../components/styles.css";



const Admin = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container className='admins_container'>
            <Navbar bg="dark" variant="dark" className="w-100 rounded p-2">
                <Container>
                    <NavLink to="/" className="navbar-brand ml-5">Магазин</NavLink>
                    <Nav className="ml-auto">
                        <NavLink to="/admin" className="nav-link mr-5">Панель управления</NavLink>
                    </Nav>
                </Container>
            </Navbar>
                <ListGroup className="w-50">
                    <h2 className='panel'>Панель управления</h2>
                    <span>
                            Это панель управления магазином для администратора
                    </span>
                        <ListGroup.Item className='mb-2 mt-3 rounded text-center bg-success text-white' action href="/admin/orders">
                            Заказы в магазине
                        </ListGroup.Item>
                        <ListGroup.Item className='mb-2 rounded text-center bg-success text-white' action href="/admin/categories">
                            Категории каталога
                        </ListGroup.Item>
                        <ListGroup.Item className='mb-2 rounded text-center bg-success text-white' action href="/admin/brands">
                            Бренды каталога
                        </ListGroup.Item>
                        <ListGroup.Item className='mb-2 rounded text-center bg-success text-white' action href="/admin/products">
                            Товары каталога
                        </ListGroup.Item>
                                <Button className="mb-3 mt-4 w-25"onClick={handleLogout}>Выйти</Button>
                </ListGroup>
                
        </Container>
    )
}

export default Admin