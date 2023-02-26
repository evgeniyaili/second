import { useState, useEffect } from 'react'
import { adminGetOne as getOneOrder } from '../http/orderAPI.js'
import { Container, Nav, Navbar, NavLink, Spinner } from 'react-bootstrap'
import Order from '../components/Order.js'
import { useParams } from 'react-router-dom'

const AdminOrder = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getOneOrder(id)
            .then(
                data => setOrder(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
    }, [id])

    if (fetching) {
        return <Spinner animation="border" />
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Container className='w-auto'>
            <Navbar bg="dark" variant="dark" className="w-100 rounded p-2">
                <Container>
                    <NavLink href="/" className="navbar-brand ml-5">Магазин</NavLink>
                        <Nav className="ml-auto">
                            <NavLink href="/admin" className="nav-link mr-5">Панель управления</NavLink>
                        </Nav>
                </Container>
            </Navbar>
            <h4 className='panel'>Заказ № {order.id}</h4>
            <Order data={order} admin={true} />
        </Container>
    )
}

export default AdminOrder