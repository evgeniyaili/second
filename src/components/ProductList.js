import { Pagination} from 'react-bootstrap'
import ProductItem from './ProductItem.js'
import {   useCallback, useContext,  useEffect,  useState} from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import './styles.css';
import { useNavigate, createSearchParams } from 'react-router-dom'
import { hooks } from '../hooks/hooks.js'

const ProductList = observer((showPayment, setShowPayment) => {
    const { catalog } = useContext(AppContext)
    const {show} = showPayment;
    const {setShow} = setShowPayment;
    //const { basket } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (page) => {
        catalog.page = page
        // при каждом клике добавляем в историю браузера новый элемент
        const params = {}
        if (catalog.category) params.category = catalog.category
        if (catalog.brand) params.brand = catalog.brand
        if (catalog.page > 1) params.page = catalog.page
        navigate({
            pathname: '/',
            search: '?' + createSearchParams(params),
        })
    }

    const pages = []
    for (let page = 1; page <= catalog.pages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === catalog.page}
                activeLabel=""
                onClick={() => handleClick(page)}
            >
                {page}
            </Pagination.Item>
        )}

        const {tg, queryId} = hooks();
        const [addedItems, setAddedItems] = useState([]);

        const onSendData = useCallback( () => {
                const data = {
                  products: addedItems,
                  totalPrice: getTotalPrice(addedItems),
                  queryId
                }
                fetch('http://localhost:3002', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify(data)
                })
        }, [addedItems, queryId])

        useEffect( () => {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            }
        },[onSendData,tg])

        

        const onPayment = useCallback(() => {
            setShow((prev) => !prev)
        },[setShow]);

        useEffect( () => {
            tg.onEvent('mainButtonClicked', onPayment)
            return () => {
                tg.offEvent('mainButtonClicked', onPayment)
            }
        },[onPayment,tg])


        const getTotalPrice = (items = []) => {
            return items.reduce((acc,item)=>{
                return acc+=item.price
            }, 0)
        }

        
        const onAdd = (product) => {
            const alreadyAdded = addedItems.find(item => item.id === product.id);
            let newItems = [];

            if (alreadyAdded) {
                newItems = addedItems.filter(item => item.id !== product.id);
            } else {
                newItems = [...addedItems, product];
            }
            setAddedItems(newItems)
            const total = getTotalPrice(newItems)

            if(newItems.length === 0) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
                tg.MainButton.setParams({
                    text: 'Купить (' + total + 'руб. )'
                })
        }}

        const onDelete = () => {
            
        }
    

    return (
        <>
            <div className="product_list" style={{maxHeight: show? 0 : "100vh", transition: "max-height 0.2s ease-out, opasity 0.2s ease-out"}}>
                {catalog.products.length ? (
                    catalog.products.map(item =>
                        <ProductItem className="product_item"  key={item.id} product={item} onAdd={onAdd} onDelete={onDelete}/>
                    )
                ) : (
                    <p className="p">По вашему запросу ничего не найдено</p>
                )}
            </div>
            {catalog.pages > 1 && <Pagination>{pages}</Pagination>}
        </>
    )
})

export default ProductList