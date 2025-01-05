import React, { useEffect, useState } from 'react'
import { readCards } from '../config/firebase/lib'

import { updateCardChecked, deleteCard } from '../config/firebase/lib';

const Cards = () => {

    const [cards, setCards] = useState([]);


    async function readCardsFunction() {
        const objs = await readCards()
        setCards(objs)
    }
    async function checkedClick(checked, cardnumber) {
        await updateCardChecked(!checked, cardnumber);
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.cardnumber === cardnumber ? { ...card, checked: true } : card
            )
        );
    }

    // Handle card deletion
    async function deleteClick(cardnumber) {
        const confirmDelete = window.confirm("Are you sure you want to delete this card?");
        if (!confirmDelete) {
            console.log("Card deletion canceled by user.");
            return;
        }
        await deleteCard(cardnumber);
        setCards((prevCards) => prevCards.filter((card) => card.cardnumber !== cardnumber));
        console.log('Card deleted and state updated!');
    }


    function copyCardNumberFunctio(cardnumber) {
        navigator.clipboard.writeText(cardnumber.replace(/\s/g, ""))
            .then(() => {
                console.log('Text copied to clipboard');
                // Optionally, you can set a state to show a message indicating successful copy
            })
            .catch(err => {
                console.error('Unable to copy text to clipboard: ', err);
                // Handle any errors here
            });
    }

    useEffect(() => {

        readCardsFunction()

    }, [])



    return (
        <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 m-4 items-center">

            {cards.map(card => {

                return (
                    <div key={card.cardnumber} className="  p-4 rounded-lg bg-theme  shadow-md">

                        <div className='flex items-center justify-start'>
                            <p className="text-white font-poppins my-1 text-[20px]"> {card.nameOnCard}</p>
                            <button onClick={() => { copyCardNumberFunctio(card.cardnumber) }} className='bg-blue-500 text-white ml-8 p-2 px-8 rounded font-semibold text-xs hover:bg-blue-600'>
                                COPY
                            </button>
                        </div>
                        <p className="text-white font-poppins my-1 text-[20px] font-semibold"> {card.cardnumber}</p>
                        <p className="text-white font-poppins my-1 text-[16px]"> {card.month}/{card.year}</p>
                        <p className="text-white font-poppins my-1 text-[16px]"> {card.cvv}</p>
                        <p className="text-white font-poppins my-1 text-[18px]">{card.date}</p>
                        {/* Submit Button */}

                        <div className='flex space-x-3'>

                            <button onClick={() => { checkedClick(card.checked, card.cardnumber) }} type="submit" className={`w-full text-white py-2 px-4 rounded-md ${card.checked ? "bg-green-500" : "bg-red-500"} `}>{card.checked ? "checked" : "not checked"}</button>
                            <button onClick={() => { deleteClick(card.cardnumber) }} type="submit" className={`w-full  py-2 px-4 rounded-md bg-black text-white `}>Delete</button>
                        </div>
                    </div>
                )

            })}



        </div>
    )
}
export default Cards;
