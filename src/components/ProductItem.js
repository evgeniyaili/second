//import { Card } from 'react-bootstrap'
import {   useState } from 'react';
import {  Image } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
//import { append } from '../http/basketAPI';
//import { fetchOneProduct } from '../http/catalogAPI';
//import { AppContext } from './AppContext';
import './styles.css';

import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import { hooks } from '../hooks/hooks';



const ProductItem = ({  product, onAdd, onDelete}) => {

    const [counter, setCounter] = useState(0);
    const onAddHandler = () =>{
        setCounter((prev) => prev+1)
        onAdd(product);
    }
    const onDeleteHandler = () => {
        setCounter((prev) => (prev-1 < 0 ? 0 : prev-1))
        onDelete(product);
    }
    const navigate = useNavigate()
    
    return (
        <div className="product">
             <div className='item' onClick={() => navigate(`/product/${product.name}`)}>
                <span className="notify-badge" style={{ 
                    visibility: counter === 0 ? "hidden" : "visible",
                    opacity: counter === 0 ? 0 : 1,
                    transition: "visibility 0.2s ease-out, opacity 0.2s ease-out"
                }}
                    >{counter}</span>
                <Image className="product_img" width={150} height={150} src={process.env.REACT_APP_IMG_URL + product.image}/>
                    <div className='name'>{product.name}</div>
            </div>
            <div className="buttons_container">
                <Button className="delete_button"
                variant='contained'
                onClick={onDeleteHandler}
                sx={{flexBasis: counter === 0 ? "0%" : "45%",
                minWidth: 0,
                backgroundColor: "#e64d44",
                visibility: counter === 0 ? "hidden" : "visible",
                opacity: counter === 0 ? 0 : 1,
                transition: "visibility 0.2s ease-out, opacity 0.2s ease-out",
                padding: "unset",
                borderRadius: 2
                }}>
                    {counter === 0 ? "" : <RemoveIcon fontSize="small"/>}
                </Button>
               <Button
               variant='contained'
                onClick={onAddHandler}
                sx={{
                    flexBasis: counter === 0 ? "100%" : "45%",
                    minWidth: 0,
                    backgroundColor: "#f8a917",
                    transition: "all 0.2s ease-out",
                    fontWeight:"700",
                    fontSize: 14,
                    borderRadius: 2,
                    height: 35
                }}
                >
                    {counter === 0 ? product.price + " ₽" : <AddIcon fontSize="small"/>}
                </Button>

            </div>
            
        </div>
        
    )
}

export default ProductItem