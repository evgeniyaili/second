import { Pagination} from 'react-bootstrap'
import ProductItem from './ProductItem.js'
import {  useContext, useState} from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import './styles.css';
import { useNavigate, createSearchParams } from 'react-router-dom'
import { hooks } from '../hooks/hooks.js'

const ProductList = observer(() => {
    const { catalog } = useContext(AppContext)
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

        const {tg} = hooks();

        // const onSendData = useCallback( () => {
        //         const data = {
        //             basket
        //         }
        //         tg.sendData()
        // }, [basket, tg])

        // useEffect( () => {
        //     tg.WebApp.onEvent('mainButtonClicked', onSendData)
        //     return () => {
        //         tg.WebApp.offEvent('mainButtonClicked', onSendData)
        //     }
        // },[onSendData,tg.WebApp])

        // useEffect( () => {
        //     tg.MainButton.setParams({
        //         text: 'К оплате'
        //     })
        // },[tg.MainButton])

        // useEffect( () => {
        //     if (!basket) {
        //         tg.MainButton.hide();
        //     } else {
        //         tg.MainButton.show();
        //     }
        // },[basket,tg.MainButton])

        const getTotalPrice = (items = []) => {
            return items.reduce((acc,item)=>{
                return acc += item.price
            }, '')
        }

        const [addedItems, setAddedItems] = useState([]);
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
    

    return (
        <>
            <div className="product_list">
                {catalog.products.length ? (
                    catalog.products.map(item =>
                        <ProductItem className="product_item"  key={item.id} product={item} onAdd={onAdd}/>
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