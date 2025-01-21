import React from "react";
import logoImg from "../IMAGES/imgAndLogo.png";
import { useNavigate } from 'react-router-dom';
import css from "./start.module.css";

function Start() {
  const navigate = useNavigate();
  return (<div className={css.startContainer}> 
  <div className={css.startChild}>
    <img src={logoImg} alt ="Logo" className={css.logoImg}></img>
    <p className={css.startParagraph}>Supercharge your productivity and take control of your tasks with Task Pro - Dont wait, start achieving your goals now!</p>
   
    <button type='button' onClick={()=> navigate("/auth/register")} className={css.registerStartBtn}>Registration</button>
    <button type='button' onClick={()=> navigate("/auth/login")}className={css.loginStartBtn}>Log in</button>
    
    </div>
  </div>);
}

export default Start;