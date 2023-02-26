import { makeAutoObservable } from 'mobx'

class CatalogStore {
   
    constructor() {
        this._categories = [
            {id: 1, name: 'Sneakers'},
            {id: 2, name: 'T-Shirts'},
            {id: 3, name: 'Hoodies'}
        ]
        this._brands = []
        this._products = [
            {id: 1, name: "Nike AF1", price: "2000000", img: ''},
            {id: 2, name: "Nike AF1", price: "3000000", img: ''},
            {id: 3, name: "Nike AF1", price: "4000000", img: ''},
            ]
            this._category = null // выбранная категория
            this._brand = null // выбранный бренд
            this._page = 1 // текущая страница
            this._count = 0 // сколько всего товаров
            this._limit = 100 // товаров на страницу
        
        makeAutoObservable(this)
    }

    get categories() {
        return this._categories
    }

    get brands() {
        return this._brands
    }

    get products() {
        return this._products
    }

    get category() {
        return this._category
    }

    get brand() {
        return this._brand
    }

    get page() {
        return this._page
    }

    get count() {
        return this._count
    }

    get limit() {
        return this._limit
    }

    get pages() { // всего страниц
        return Math.ceil(this.count / this.limit)
    }

    set categories(categories) {
        this._categories = categories
    }

    set brands(brands) {
        this._brands = brands
    }

    set products(products) {
        this._products = products
    }

    set category(id) {
        this.page = 1
        this._category = id
    }

    set brand(id) {
        this.page = 1
        this._brand = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}

export default CatalogStore