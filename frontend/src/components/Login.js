import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
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

    const handleGoogleLogin = async (e) =>{
      e.preventDefault();

      try{
        await signInWithPopup(auth, googleProvider);
        navigate("/");
      }catch(error){
        alert("Помилка входу через Google: " + error.message);
      }
    }

   const resetLogin = async () => {
    if (!email) {
      alert("Введіть email для скидання пароля");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Лист для скидання пароля надіслано на " + email);
    } catch (error) {
      alert("Помилка при скиданні пароля: " + error.message);
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
      <div>
        <div className="form-group button-container full-width">
          <button type="button" onClick={handleGoogleLogin}>Увійти через Google</button>
          </div>
      </div>
      <div>
      <div className="form-group button-container full-width">
          <button type="button" onClick={resetLogin}>Забули пароль</button>
          </div>
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
