import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import { NavLink } from 'react-router-dom'



const Admin = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container>
            <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to="/" className="navbar-brand">Магазин</NavLink>
                <Nav className="ml-auto">
                            <NavLink to="/admin" className="nav-link">Панель управления</NavLink>
                </Nav>
            </Container>
        </Navbar>
            <h1>Панель управления</h1>
            <p>
                Это панель управления магазином для администратора
            </p>
            <ul>
                <li><Link to="/admin/orders">Заказы в магазине</Link></li>
                <li><Link to="/admin/categories">Категории каталога</Link></li>
                <li><Link to="/admin/brands">Бренды каталога</Link></li>
                <li><Link to="/admin/products">Товары каталога</Link></li>
            </ul>
            <Button onClick={handleLogout}>Выйти</Button>
        </Container>
    )
}

export default Admin