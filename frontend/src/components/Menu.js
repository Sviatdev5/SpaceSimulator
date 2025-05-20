import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

function Menu(){
    const [user, setUser] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return () => unsubscribe();

    }, []);
    
    const handleSignOut = async(e) =>{
        e.preventDefault();
        setShowConfirm(true);
    } 

    const confirmLogout = async () => {
    try {
      await signOut(auth);
      setShowConfirm(false);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

   const cancelLogout = () => {
    setShowConfirm(false);
  };
    
        return(
             <>
                <nav className="menu"> 
                    <ul>
                       <li><Link to="/">Головна</Link></li>
                       <li><Link to="/ship">Космічний корабель</Link></li>
                       <li><Link to="/missions">Експедиції</Link></li>
                       <li><Link to="/journeys">Мої подорожі</Link></li>
                       {user ? (
                        <li onClick={handleSignOut}><Link to="/">Вихід</Link></li>) 
                        : (<li> <Link to="/login">Вхід</Link></li> )}


                    </ul>
                </nav>
                {showConfirm && (
                    <form>
        <h2>Чи дійсно бажаєте вийти?</h2>
        <div className="">
        <button  onClick={confirmLogout}>Так</button>
      </div>
      <div>
        <div className="">
          <button onClick={cancelLogout} >Ні</button>
          </div>
      </div>
      </form>
           
      )}
            </>


        )
    }

export default Menu