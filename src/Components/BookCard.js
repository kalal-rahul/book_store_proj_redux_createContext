import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export const BookCard = (props) => {

    const [addToCart, setAddToCart] = useState("Add to cart");
    const {cart} = useContext(DataContext);
    const {setCart} = useContext(DataContext);

    useEffect(() => {
        // console.log("Use effect trigerred");
        setAddToCart("Add to cart");
    }, [props.availableBooks]); //Re-render the component whenever there is change in state of variable in the array

    const handleAddToCart = (eachBookData) => {

        setAddToCart((prev) => {

            if (prev === "Add to cart") {

                setCart([...cart, eachBookData]);
                return ("Remove from cart");
            }

            else {

                let removed = false;
                let bookToBeRemoved = eachBookData.bookName;
                let updatedCart = cart.filter((removeBook) =>{
                    if ((removeBook.bookName === bookToBeRemoved) && !removed){
                        removed = true;
                        return false;
                    }
                    else
                        return true;

                })

                setCart(updatedCart);
                return ("Add to cart");
            }
        }
        );

    };

    return (
        <div className='book-card flex-column' key={props.index}>
            <div className='book-image'>
                <img src={props.eachBookData.bookImage} alt="Cover page of book" />
            </div>
            <div className='book-detail'>
                <h3>{props.eachBookData.bookName}</h3>
                <p>Rs.{props.eachBookData.cost} /-</p>
                <button onClick={() => { handleAddToCart(props.eachBookData) }} >{addToCart}</button>
            </div>
        </div>
    );
};