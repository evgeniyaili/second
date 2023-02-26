import { useState, useEffect } from 'react'
import { adminGetAll as getAllOrders } from '../http/orderAPI.js'
import { Container, Nav, Navbar, NavLink, Spinner } from 'react-bootstrap'
import Orders from '../components/Orders.js'
import CreateOrder from '../components/CreateOrder.js'
import "../components/styles.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [show, setShow] = useState(false)

    useEffect(() => {
        getAllOrders()
            .then(
                data => setOrders(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container className='w-auto'>
            <Navbar bg="dark" variant="dark" className="w-auto rounded p-2">
            <Container>
                <NavLink href="/" className="navbar-brand ml-5">Магазин</NavLink>
                <Nav className="ml-auto">
                            <NavLink href="/admin" className="nav-link mr-5">Панель управления</NavLink>
                </Nav>
            </Container>
        </Navbar>
            <h4 className='panel'>Все заказы</h4>
            {/* <Button className="mb-3" onClick={() => setShow(true)}>Создать заказ</Button> */}
            <CreateOrder show={show} setShow={setShow} />
            <Orders items={orders} admin={true} />
        </Container>
    )
}

export default AdminOrders