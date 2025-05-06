import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            navigate("/");
        } catch (err){
            alert(err.message)
        }
    };

    return (
        
      <form onSubmit={handleLogin}>
        <h2>Вхід</h2>
        <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        </div>
        <div className="form-group">
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        </div>
        <div className="form-group button-container full-width">
        <button type="submit">Увійти</button>
      </div>
        <p>
          Немає акаунту?{" "}
          <span onClick={() => navigate("/register")} className="switch-link">
            Зареєструватись
          </span>
        </p>
      </form>

    )
}
