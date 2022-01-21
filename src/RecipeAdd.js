import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { prettyDOM } from "@testing-library/react";
import axios from "axios";

const API_BASE = 'http://192.249.18.176:443';

export default function RecipeAdd() {
    const { userId } = useParams();
    const [ ingredients, setIngredients ] = useState([]);
    const [ procedures, setProcedures ] = useState([]);
    const ingredientNameRef = useRef();
    const ingredientAmountRef = useRef();
    const procedureRef = useRef();
    const titleRef = useRef();
    const recipememoRef = useRef();


    return (
        <>
            <div onClick={(e) => {
                e.preventDefault();
                axios.post(`${API_BASE}/recipe`, {
                    owner: userId,
                    title: titleRef.current.value,
                    memo: recipememoRef.current.value,
                    favorite: false,
                    ingredients: ingredients,
                    procedur: procedures
                });
            }}>Add recipe</div>
            <div style={{ display: "flex" }}>
                <input placeholder="title" ref={titleRef}></input>
                <input placeholder="memo" ref={recipememoRef}></input>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input placeholder="name" ref={ingredientNameRef}></input>
                <input type="number" placeholder="amount" ref={ingredientAmountRef}></input>
                <div style={{ fontSize: "1.5rem" }} onClick={(e) => {
                    e.preventDefault();
                    setIngredients(ingredients.concat({ 
                        name: ingredientNameRef.current.value,
                        amount: Number(ingredientAmountRef.current.value)
                    }));
                }}>+</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input placeholder="procedure" ref={procedureRef}></input>
                <div style={{ fontSize: "1.5rem" }} onClick={(e) => {
                    e.preventDefault();
                    setProcedures(procedures.concat({ 
                        index: procedures.length + 1,
                        content: procedureRef.current.value
                    }));
                }}>+</div>
            </div>
            <div>
                {ingredients.map((e, i)=> <div key={i}>{`${e.name}: ${e.amount}g`}</div>)}
            </div>
            <div>
                {procedures.map((e)=> <div key={e.index}>{`${e.index}: ${e.content}`}</div>)}
            </div>
        </>
    );
}