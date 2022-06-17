import React, { useState } from 'react'
import { useRef } from "react";
import logo from '../resources/logo-empack-transp.png'
import './encuesta.css'
import { db } from "../firebase";



export default function Encuesta() {
    const [showCommentSection, setShowCommentSection] = useState(false);
    const starOneRef = useRef();
    const starTwoRef = useRef();
    const starThreeRef = useRef();
    const starFourRef = useRef();
    const starFiveRef = useRef();

    const starTextRef = useRef();
    const errorTextRef = useRef();
    const varibleContentRef = useRef();
    const successTextRef = useRef();

    // const commentsRef = useRef();

    // const recommendRef = useRef();

    const handleLowRatingClick = () => {
        setShowCommentSection(true);
    }
    const handleHighRatingClick = () => {
        setShowCommentSection(false);
    }

    /* Star One Handlers */
    const handleStarOneHover = () => {
        starOneRef.current.style.color = "#fd4";
        starTwoRef.current.style.color = "#444";
        starThreeRef.current.style.color = "#444";
        starFourRef.current.style.color = "#444";
        starFiveRef.current.style.color = "#444";
        starTextRef.current.innerText = 'Muy mala';
        errorTextRef.current.innerText = '';
    }

    /* Star Two Handlers */
    const handleStarTwoHover = () => {
        starOneRef.current.style.color = "#fd4";
        starTwoRef.current.style.color = "#fd4";
        starThreeRef.current.style.color = "#444";
        starFourRef.current.style.color = "#444";
        starFiveRef.current.style.color = "#444";
        starTextRef.current.innerText = 'Mala'
        errorTextRef.current.innerText = '';
    }

    /* Star Three Handlers */
    const handleStarThreeHover = () => {
        starOneRef.current.style.color = "#fd4";
        starTwoRef.current.style.color = "#fd4";
        starThreeRef.current.style.color = "#fd4";
        starFourRef.current.style.color = "#444";
        starFiveRef.current.style.color = "#444";
        starTextRef.current.innerText = 'Indiferente'
        errorTextRef.current.innerText = '';
    }

    /* Star Four Handlers */
    const handleStarFourHover = () => {

        starOneRef.current.style.color = "#fd4";
        starTwoRef.current.style.color = "#fd4";
        starThreeRef.current.style.color = "#fd4";
        starFourRef.current.style.color = "#fd4";
        starFiveRef.current.style.color = "#444";
        starTextRef.current.innerText = 'Buena'
        errorTextRef.current.innerText = '';
    }


    /* Star Five Handlers */
    const handleStarFiveHover = () => {
        starOneRef.current.style.color = "#fd4";
        starTwoRef.current.style.color = "#fd4";
        starThreeRef.current.style.color = "#fd4";
        starFourRef.current.style.color = "#fd4";
        starFiveRef.current.style.color = "#fd4";
        starTextRef.current.innerText = 'Muy buena'
        errorTextRef.current.innerText = '';
    }

    const firstCheckBoxGroupValues = [];
    const secondCheckBoxGroupValues = [];

    const handleChange = (e) => {
        const checked = e.target.checked;
        const checkedValue = e.target.value;
        // Si el checkbox esta checkeado guardamos su valor
        if (checked === true) {
            firstCheckBoxGroupValues.push(checkedValue); // push guarda un nuevo valor al final del array
        }
        // Si no está checkeado quitamos el valor anteriormente guardado
        else if (checked === false) {
            // filter elimina un valor de un arreglo que coincida con la condicion dada
            firstCheckBoxGroupValues = firstCheckBoxGroupValues.filter(
                (value) => value === checkedValue
            );
        }

        // console.log(firstCheckBoxGroupValues);

       
    };

    const handleChangeLowRating = (e) => {
        const checked = e.target.checked;
        const checkedValue = e.target.value;
        // Si el checkbox esta checkeado guardamos su valor
        if (checked === true) {
            secondCheckBoxGroupValues.push(checkedValue); // push guarda un nuevo valor al final del array
        }
        // Si no está checkeado quitamos el valor anteriormente guardado
        else if (checked === false) {
            // filter elimina un valor de un arreglo que coincida con la condicion dada
           secondCheckBoxGroupValues = secondCheckBoxGroupValues.filter(
                (value) => value === checkedValue
            );
        }

        // console.log(secondCheckBoxGroupValues);
    };


    const handleSendButton = (e) => {
        e.preventDefault();
        if (starTextRef.current.innerText === '') {
            errorTextRef.current.innerText = '(Debe seleccionar una valoración antes de enviar su respuesta)'
            return;
        }

        var answer = starTextRef.current.innerText;
        answer = answer.replaceAll("\"", "")
        var answerDate = new Date();
        answerDate = answerDate.toISOString().slice(0, 10);
        // var comments;
        // if (showCommentSection === false) {
        //     comments = 'Sin comentarios';
        // }
        // else {
        //     comments = commentsRef.current.value;
        // }
        // if (comments === '') {
        //     errorTextRef.current.innerText = '(Debe seleccionar una opción antes de enviar su respuesta)'
        //     return;
        // }

        // var recommend;
        // recommend = recommendRef.current.value;

        // if (recommend === '') {
        //     errorTextRef.current.innerText = '(Debe seleccionar una opción de recomendación antes de enviar su respuesta)'
        //     return;
        // }
        
        if (firstCheckBoxGroupValues.length === 0) {
            errorTextRef.current.innerText = '(Debe seleccionar una opción antes de enviar su respuesta)'
            return;
        }
        if (showCommentSection === true){
            if (secondCheckBoxGroupValues.length === 0 ) {
                errorTextRef.current.innerText = '(Debe seleccionar una razón antes de enviar su respuesta)'
                return;
            }
        }

        var data = {
            answer: answer,
            answerDate: answerDate,
            recomendacion: firstCheckBoxGroupValues,
            lowRatingComment: secondCheckBoxGroupValues
            // comments: comments,
            // recommend: recommend
        }

        db.collection("empack-encuesta").add(data).then(function (response) {
            console.log("Encuesta enviada exitosamente.")
            console.log(response)
            varibleContentRef.current.innerHTML = ''
            successTextRef.current.style.display = 'inline'

        }).catch(function (error) {
            console.log("El servidor respondió con el siguiente error: ", error);
            errorTextRef.current.innerText = 'Ocurrió un erorr al enviar la encuesta.';

        })


    }


    return (
        <div className='container'>

            <div className='mainDiv d-flex flex-column min-vh-100 justify-content-center align-items-center'>

                <div className="logo-img">
                    <img src={logo} alt="empack-logo" />
                </div>

                <div className='variable-content d-flex flex-column  justify-content-center align-items-center' ref={varibleContentRef}>


                    <div className='question mb-4'>
                        <h3>¿Cómo encontraste la experiencia de compra en nuestro sitio web Empack Link?</h3>
                    </div>

                    <div className='stars'>

                        <label htmlFor="rate-5" className="fas fa-star" id="label-5" ref={starFiveRef} onClick={() => handleHighRatingClick()} onMouseEnter={() => handleStarFiveHover()} ></label>

                        <label htmlFor="rate-4" className="fas fa-star" ref={starFourRef} onClick={() => handleHighRatingClick()} onMouseEnter={() => handleStarFourHover()}  ></label>

                        <label htmlFor="rate-3" className="fas fa-star" ref={starThreeRef} onClick={() => handleLowRatingClick()}
                            onMouseEnter={() => handleStarThreeHover()} ></label>

                        <label htmlFor="rate-2" className="fas fa-star" ref={starTwoRef} onClick={() => handleLowRatingClick()}
                            onMouseEnter={() => handleStarTwoHover()} ></label>

                        <label htmlFor="rate-1" className="fas fa-star" id="label-1" ref={starOneRef} onClick={() => handleLowRatingClick()}
                            onMouseEnter={() => handleStarOneHover()}></label>

                    </div>

                    <div className="star-text" ref={starTextRef}>
                    </div>

                    {showCommentSection ?
                        <div className='comment-area mb-4 w-100'>
                            <div className="form-group custom-select">
                                <h3>¿Por qué?</h3>
                                <div className='comment-box'>
                               
                                    <br />
                                    
                                    <input type="checkbox" id="cbox1" value="Precio muy alto" onChange={(e) => handleChangeLowRating(e)} /> <label for="cbox1">Precio muy alto</label><br />
                               
                                    
                                    <input type="checkbox" id="cbox2" value="Lentitud del sitio" onChange={(e) => handleChangeLowRating(e)} /> <label for="cbox2">Lentitud del sitio</label><br />
                            
                                  
                                    <input type="checkbox" id="cbox3" value="Información confusa" onChange={(e) => handleChangeLowRating(e)} /> <label for="cbox3">Información confusa</label><br />
                               
                                </div>

                                {/* <select className="form-control" id="exampleFormControlTextarea1" rows="3" size='3'ref={commentsRef} multiple>
                                    <option value="Precio muy alto">Precio muy alto</option>
                                    <option value="Lentitud del sitio">Lentitud del sitio</option>
                                    <option value="Información confusa">Información confusa</option>
                                </select> */}
                                {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={commentsRef}></textarea> */}
                            </div>
                        </div>
                        : null}
                    <div className='comment-area mb-4 w-100'>
                        <div className="form-group custom-select">
                            <h3>¿Cómo te enteraste de nuestra página web?</h3>
                            <div className='recommend-box'>
                                <br />
                                <input type="checkbox" id="rbox1" value="LinkedIn" onChange={(e) => handleChange(e)} /> <label for="rbox1">LinkedIn</label><br />
                                <input type="checkbox" id="rbox2" value="Google" onChange={(e) => handleChange(e)} /> <label for="rbox2">Google</label><br />
                                <input type="checkbox" id="rbox3" value="Recomendacion" onChange={(e) => handleChange(e)} /> <label for="rbox3">Recomendación</label><br />
                                <input type="checkbox" id="rbox4" value="Pagina Empack" onChange={(e) => handleChange(e)} /> <label for="rbox4">Página de Empack</label><br />
                                <input type="checkbox" id="rbox5" value="Mail" onChange={(e) => handleChange(e)} /> <label for="rbox5">Mail</label><br />
                            </div>
                            {/* <select className="form-control" id="custom-select" rows="3" size='5' placeholder="Elige una opción" ref={recommendRef} >
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Google">Google</option>
                                    <option value="Recomendacion">Recomendación</option>
                                    <option value="Página Empack">Página de Empack</option>
                                    <option value="Mail">Mail</option>
                                </select> */}

                        </div>
                    </div>

                    <div className="send-button w-50">
                        <button className="btn w-100" onClick={(e) => handleSendButton(e)}>Enviar evaluación</button>
                    </div>

                    <div className='error-text mt-4' ref={errorTextRef}>

                    </div>

                </div>

                <div className='success-text' ref={successTextRef}>
                    <h2>¡Gracias por tu evaluación!<br /> Tu opinión es importante para nosotros.</h2>
                </div>


            </div>

        </div>
    )
}
