import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
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
    const favRef = useRef();
    const nav = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();  
        if(titleRef.current.value) {
            axios.post(`${API_BASE}/recipe`, {
                owner: userId,
                title: titleRef.current.value,
                memo: recipememoRef.current.value,
                favorite: favRef.current.checked,
                ingredients: ingredients,
                procedur: procedures.map((e, i) => ({
                    index: i + 1,
                    content: e.content
                }))
            }).then(res => {
                console.log(res.data);
                window.alert("저장 완료");
                nav(`/home/${userId}`);
            }).catch(err => {
                console.log(err);
                window.alert("실패");
            });
        }
        else {
            window.alert("제목 입력");
        }
    }

    const onIngredientDelete = (e, i) => {
        e.preventDefault();
        setIngredients(ingredients.filter((_, idx) => idx !== i));
    }
    
    const onProcedureDelete = (e, i) => {
        e.preventDefault();
        setProcedures(procedures.filter((_, idx) => idx !== i));
    }

    return (
        <>
            <div onClick={onSubmit}>Add recipe</div>
            <div style={{ display: "flex" }}>
                <input placeholder="title" ref={titleRef}></input>
                <input placeholder="memo" ref={recipememoRef}></input>
                <input type="checkbox" ref={favRef}></input>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input placeholder="name" ref={ingredientNameRef}></input>
                <input type="number" placeholder="amount" ref={ingredientAmountRef}></input>
                <div style={{ fontSize: "1.5rem" }} onClick={(e) => {
                    e.preventDefault();
                    if(ingredientAmountRef.current.value && ingredientNameRef.current.value) {
                        setIngredients(ingredients.concat({ 
                            name: ingredientNameRef.current.value,
                            amount: Number(ingredientAmountRef.current.value)
                        }));
                        ingredientNameRef.current.value = null;
                        ingredientAmountRef.current.value = null;
                    }
                }}>+</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input placeholder="procedure" ref={procedureRef}></input>
                <div style={{ fontSize: "1.5rem" }} onClick={(e) => {
                    e.preventDefault();
                    if(procedureRef.current.value) {
                        setProcedures(procedures.concat({ 
                            content: procedureRef.current.value
                        }));
                        procedureRef.current.value = null;
                    }
                }}>+</div>
            </div>
            <div>{
                ingredients.map((e, i) => 
                    <div key={i} onClick={(e) => onIngredientDelete(e, i)}>
                        {`${e.name}: ${e.amount}g`}
                    </div>)
            }</div>
            <div>{
                procedures.map((e, i)=> 
                    <div onClick={(e) => onProcedureDelete(e, i)} key={i}>
                        {`${i + 1}: ${e.content}`}
                    </div>)
            }</div>
        </>
    );
}