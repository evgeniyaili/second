//import { Card } from 'react-bootstrap'
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import './styles.css';

const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <div className="product" onClick={() => navigate(`/product/${data.id}`)}>
            <Image className="product_img" width={150} height={150} src={process.env.REACT_APP_IMG_URL + data.image}/>
                    <div className='name'>{data.name}</div>
        </div>
    )
}

export default ProductItem