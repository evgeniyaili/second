//import { Card } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { append } from '../http/basketAPI';
import { fetchOneProduct } from '../http/catalogAPI';
import { AppContext } from './AppContext';
import './styles.css';
import { hooks } from '../hooks/hooks';

const {onClose} = hooks();
const ProductItem = ({data}) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    // const [rating, setRating] = useState(null)

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        // fetchProdRating(id).then(data => setRating(data))
    }, [id])

    const handleClick = (productId) => {
        append(productId).then(data => {
            basket.products = data.products
        })
    }
    return (
        <div className="product" onClick={() => navigate(`/product/${data.id}`)}>
            <Image className="product_img" width={150} height={150} src={process.env.REACT_APP_IMG_URL + data.image}/>
                    <div className='name'>{data.name}</div>
                    <Button  style={{backgroundColor: ""}} className="rounded-pill w-75 align-self-center d-flex justify-content-around border-0" size="sm" onClick={onClose}><div className='pricediv'>{data.price} ₽</div><div className='plusdiv'>+</div></Button>
        </div>
    )
}

export default ProductItem