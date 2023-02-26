import { AppContext } from '../components/AppContext.js'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { login } from '../http/userAPI.js'
import { observer } from 'mobx-react-lite'
import "../components/styles.css";

const Login = observer(() => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    // если пользователь авторизован — ему здесь делать нечего
    useEffect(() => {
        if (user.isAdmin) navigate('/admin', {replace: true})
        
    }, [user.isAdmin, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()
        const data = await login(email, password)
        if (data) {
            user.login(data)
            if (user.isAdmin) navigate('/admin')
           
        }
    }

    return (
        <div classname="admins_container">
            <Container className="d-flex justify-content-center">
                <Card style={{width: '500px'}} className=" mt-5 bg-light">
                    <h3 className="m-auto">Авторизация</h3>
                    <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <Form.Control
                            name="email"
                            className="mt-3"
                            placeholder="Введите ваш email..."
                        />
                        <Form.Control
                            name="password"
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                        />
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <Button type="submit">
                                Войти
                            </Button>
                            {/* <p>
                                Нет аккаунта?
                                <Link to="/signup">Зарегистрирутесь!</Link>
                            </p> */}
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    )
})

export default Login
