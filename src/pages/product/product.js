import './product.css'
import { useEffect, useState } from "react"
import { FakeStoreApi } from '../../services/fake-store-api'
import { Link, useParams } from "react-router-dom"
import { useCart } from "../../context/cart"

const Product = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState();
    const { productId } = useParams();
    const { cart, addToCart } = useCart()

    console.log(22, productId, cart)
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
             const product = cart.filter((item)=> item.id === parseInt(productId) )
             console.log(44,product)
            setProduct(product);
            setLoading(false);
        }
        fetchProduct().catch(console.error)
    }, [productId])

    if (!loading && !product) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">
                        Product not found. Please visit{" "}
                        <Link to="/" replace>
                            home
                        </Link>{" "}
                        to see all available products
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="container">
            {loading ? (
                <div className={"loader"}></div>
            ) : (
                <div className="product py-2">
                    <div className="details grid p-3">
                        <div className="product-image">
                            <img src={product[0].image} alt="" />
                        </div>
                        <div className="info">
                            <div className="description">
                                <h3>{product[0].title}</h3>
                                <p className=" my-2">{product[0].description}</p>
                            </div>
                            <div className="flex">
                                <span className="price">Rs.{product[0].price}</span>
                                {/* <span className="cart" onClick={() => addToCart(product)}>
                                    <img src="/cart.svg" alt="" />
                                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export { Product }