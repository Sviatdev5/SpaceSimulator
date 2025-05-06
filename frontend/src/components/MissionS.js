import React, { useState } from "react";
import Mission from "./Mission";
import ModalWindow from "./ModalWindow";
import Filtr from "./Filtr";
import Header from "./Header";
function MissionS({onMissionClick, isProgress, isMenuVisible}) {
     const [valueType,setValueType] = useState("all");
     const [valueComplexity,setValueComplexity] = useState("all");

    const [missions, setMissions] = useState([
        { id: "mars", type: "research", complexity: "easy", title: "Дослідження Марса", description: "Марс активно досліджується за допомогою роботизованих місій, таких як марсоходи Perseverance і Curiosity, які вивчають його геологію та можливість існування життя в минулому. У майбутньому плануються пілотовані місії, що можуть прокласти шлях до колонізації Червоної планети." },
        { id: "satelite", type: "research", complexity: "medium", title: "Запуск супутника", description: "Це складний інженерний процес, що включає підготовку, виведення на орбіту та подальше керування апаратом. Супутники використовуються для зв’язку, навігації, дослідження космосу та спостереження за Землею. Сучасні ракети-носії, такі як Falcon 9 і Ariane 5." },
        { id: "neptun", type: "rescue", complexity: "hard", title: "У пошуках Сатурна", description: "Експедиції до Сатурна здійснювалися за допомогою автоматичних міжпланетних станцій, таких як Cassini, яка досліджувала планету, її кільця та супутники. Майбутні місії можуть зосередитися на пошуку життя на супутнику Енцеладі, де виявлено підлідний океан із потенційними умовами для існування мікроорганізмів." },
        { id: "small", type: "rescue", complexity: "easy", title: "Загадка карликових планет", description: "Місія New Horizons вже дала нам неймовірні знімки Плутона, виявивши, що він має складну геологію, льодові рівнини та можливий підповерхневий океан. Також апарат пролетів повз об'єкт пояса Койпера – Аррокот, відкриваючи таємниці далеких рубежів Сонячної системи." },
        { id: "sun", type: "colonization", complexity: "medium", title: "Сонячний зонд", description: "Експедиція до Сонця, здійснювана місією Parker Solar Probe, дозволяє дослідити структуру і динаміку сонячної корони, наближаючись до світила на рекордну відстань. Ці дослідження допоможуть зрозуміти механізми нагрівання корони та походження сонячного вітру, що впливає на космічну погоду та технології на Землі." },
        { id: "moon", type: "colonization", complexity: "hard", title: "Колонізація Місяця", description: "Програма Artemis спрямована на повернення людини на Місяць і створення там постійної дослідницької бази. Це стане важливим кроком для підготовки до майбутніх пілотованих місій на Марс та глибокий космос. Місія Artemis використовує новітні технології для висадки астронавтів на Південному полюсі Місяця, де є водяний лід, що може стати ресурсом для майбутніх експедицій." }
    ]);


    const[currentMission, setCurrentMission] = useState(null)
    const[isModalOpen, setIsModalOpen] = useState(false)
 
    const filteredMissions = 
    missions.filter(mission => 
      (valueType === "all" || mission.type === valueType) && 
      (valueComplexity === "all" || mission.complexity === valueComplexity)
    );
    

  const deleteMission = (mission) => {
    setMissions(prev => prev.filter((m) => m.id !== mission.id));
    alert(`Видалено місію: ${mission.title}`);
};

  const openEditModal = (mission) => {
    setCurrentMission(mission)
    setIsModalOpen(true)
    
  };

  const closeModal = (mission) => {
    setIsModalOpen(false)
    setCurrentMission(null)
    alert(`Закрили вікно редагування: ${mission.title}`);
    
  };

  const handleSave = (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedMission = {
      ...currentMission,
      title: formData.get('title') || currentMission.title,
            description: formData.get('description') || currentMission.description,
    };
    setMissions(prev => 
      prev.map((m) => (m.id === updatedMission.id ? updatedMission : m))
  );
  closeModal(updatedMission);

  }



  return (
    <div>
    <Header isMenuVisible = {isMenuVisible}/>
    <div id="missions" className="section">
      <h2>Експедиції</h2>
      <p style={{ textAlign: "center" }}>Оберіть місію та вирушайте у подорож.</p>
      <Filtr valueType={valueType} valueComplexity={valueComplexity} onChangeType={setValueType} onChangeComplexity={setValueComplexity}/>
      <div className="missions">
        { filteredMissions.length > 0 ? (
           filteredMissions.map((el) => (
            <Mission
              key={el.id}
              mission={el}
              onClick={onMissionClick} // Передаємо обробник
              onDelete={deleteMission}
              onEdit = {openEditModal}
              isProgress={isProgress}
            />
          ))
        ) : (
          <p>Місій немає</p>
        )}
      </div>
       <ModalWindow
         isOpen={isModalOpen}
         onClose={closeModal}
         mission={currentMission || {}}
         onSave={handleSave}
       />

    </div>
    </div>
  );
}

export default MissionS;
