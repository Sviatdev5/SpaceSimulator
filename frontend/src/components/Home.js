import React from "react";
import RegistrationForm from "./RegistrationForm";
import Description from "./Description";
import Header from "./Header";
function Home({onLoginSuccess, isMenuVisible}) {
  return (
    <div>
    <Header isMenuVisible = {isMenuVisible}/>
    <div id="home" className="section">
      <Description/>
    </div>
    </div>
  );
}

export default Home;
