//import { Card } from 'react-bootstrap'
//import { useContext, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
//import { append } from '../http/basketAPI';
//import { fetchOneProduct } from '../http/catalogAPI';
//import { AppContext } from './AppContext';
import './styles.css';
//import { hooks } from '../hooks/hooks';



const ProductItem = ({ product, onAdd}) => {

    const onAddHandler = () =>{
        onAdd(product);
    }
   
    const navigate = useNavigate()
    // const { basket } = useContext(AppContext)
    // const [product, setProduct] = useState(null)
    // // const [rating, setRating] = useState(null)

    // useEffect(() => {
    //     fetchOneProduct(product).then(data => setProduct(data))
    //     // fetchProdRating(id).then(data => setRating(data))
    // }, [product])

    // const handleClick = (product) => {
    //     append(product).then(data => {
    //         basket.products = data.products
    //     })
    //}
    return (
        <div className="product">
             <div  onClick={() => navigate(`/product/${product.id}`)}>
                <Image className="product_img" width={150} height={150} src={process.env.REACT_APP_IMG_URL + product.image}/>
                    <div className='name'>{product.name}</div>
            </div>
            <Button  style={{backgroundColor: "#0088cc"}} className="rounded-pill w-75 align-self-center d-flex justify-content-around border-0" size="sm" onClick={onAddHandler}><div className='pricediv'>{product.price} ₽</div><div className='plusdiv'>+</div></Button>
        </div>
        
    )
}

export default ProductItem