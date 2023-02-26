import { useState, useEffect } from 'react'
import { fetchBrands, deleteBrand } from '../http/catalogAPI.js'
import { Button, Container, Nav, Navbar, NavLink, Spinner, Table } from 'react-bootstrap'
import EditBrand from '../components/EditBrand.js'


const AdminBrands = () => {
    const [brands, setBrands] = useState(null) // список загруженных брендов
    const [fetching, setFetching] = useState(true) // загрузка списка брендов с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id бренда, который будем редактировать — для передачи в <EditBrand id={…} />
    const [brandId, setBrandId] = useState(0)

    const handleCreateClick = () => {
        setBrandId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setBrandId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteBrand(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Бренд «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchBrands()
            .then(
                data => setBrands(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
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
                <h4 className='panel'>Бренды</h4>
            <Button className="mb-3 ml-3" onClick={() => handleCreateClick()}>Создать бренд</Button>
            <EditBrand id={brandId} show={show} setShow={setShow} setChange={setChange} />
            {brands.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                    Редактировать
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            ) : (
                <p>Список брендов пустой</p>
            )}
        </Container>
    )
}

export default AdminBrands