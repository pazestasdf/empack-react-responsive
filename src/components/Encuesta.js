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

    const commentsRef = useRef();

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

    const handleSendButton = (e) => {
        e.preventDefault();
        if (starTextRef.current.innerText === '') {
            errorTextRef.current.innerText = '(Debe seleccionar una opción antes de enviar su respuesta)'
            return;
        }

        var answer = starTextRef.current.innerText;
        answer = answer.replaceAll("\"", "")
        var answerDate = new Date();
        answerDate = answerDate.toISOString().slice(0, 10);
        var comments;
        if (showCommentSection == false){
            comments = 'Sin comentarios';
        }
        else{
            comments = commentsRef.current.value;
        }

        var data = {
            answer: answer,
            answerDate: answerDate,
            comments: comments
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

                    <div className='welcome-text mb-4'>
                        <h2>Porque nos interesa ir mejorando,
                            <br />te invitamos a calificar la experiencia que tuviste con nuestro sitio web ecommerce.</h2>

                    </div>

                    <div className='question mb-4'>
                        <h3>¿Como encontraste la experiencia de compra en nuestro sitio web Empack Link?</h3>
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
                        <div className="form-group">
                            <h3>Tu opinión nos importa</h3>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={commentsRef}></textarea>
                        </div>
                    </div>
                    : null}

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
