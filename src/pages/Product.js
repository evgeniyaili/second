import {  Button, Image } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { fetchOneProduct } from '../http/catalogAPI.js'
import { useParams } from 'react-router-dom'
import { append } from '../http/basketAPI.js'
import { AppContext } from '../components/AppContext.js'
import "../components/styles.css";
import NavBar from '../components/NavBar';
import Lottie from "lottie-react";
import animationData from '../lotties/9844-loading-40-paperplane.json';

const Product = () => {
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
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    if (!product) {
        return (
            <div>
              <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
              />
            </div>
          );
    }

    return (
        <div className='outer_container'>
            <NavBar/>
                <div className='img'>
                    {product.image ? (
                        <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={300} height={300} src="http://via.placeholder.com/300" />
                    )}
                </div>
                <div className='nameprice'>
                    <div className='naming'>
                        <span>{product.name}</span>
                    </div>
                    <div className='pricing'>
                        <span>Цена: {product.price} руб.</span>
                    </div>
                    <Button className="product_button" onClick={() => handleClick(product.id)}>Добавить в корзину</Button>
                </div>
            {!!product.props.length &&
                <div className='information'>
                        <span>Характеристики</span>
                            <div className='information_table'>
                                    {product.props.map(item => 
                                        <div key={item.id} className="about">
                                            <div>{item.name} : </div>
                                            <div>{item.value}</div>
                                        </div>
                                    )}
                            </div>
                </div>
            }
        </div>
    )
}

export default Product