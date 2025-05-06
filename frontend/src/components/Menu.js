import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

function Menu(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return () => unsubscribe();

    }, []);
    
    const handleSignOut = async(e) =>{
        e.preventDefault();
        try{
            await signOut(auth);
            navigate("/");
        } catch(err) {
            alert(err.message)

        }
    } 
    
        return(
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
        )
    }

export default Menu