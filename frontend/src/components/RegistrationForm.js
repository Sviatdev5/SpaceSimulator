import React, { useState } from "react";

function RegistrationForm({onLoginSuccess}) {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const correctPassword = "23092005S"

  const handleSubmit = (e)=>{
    e.preventDefault();

    if (!email || !name) {
      alert("Будь ласка, заповніть всі поля: ім'я та email.");
      return;
    }
    
    if (password === correctPassword) {
      onLoginSuccess(); // Викликаємо функцію для зміни стану входу*/
    } else {
      alert("Пароль неправильний, спробуйте ще раз.");
    }
  
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Ім'я:</label>
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Введіть ім'я" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Введіть email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль:</label>
        <input type="password"  value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Введіть пароль" />
      </div>
      <div className="form-group full-width">
        <label htmlFor="expectation">Очікування користувача {name}:</label>
        <textarea id="expectation" name="expectation" placeholder={`${name} що ви очікуєте від поїздки?`}></textarea>
      </div>
      <div className="form-group button-container full-width">
        <button type="submit">Увійти</button>
        <button type="submit">Назад</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
