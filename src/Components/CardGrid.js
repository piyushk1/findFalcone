// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./CardGrid.css";

// function CardGrid({ onTimeUpdate }) {
//   const [planets, setPlanets] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [cardData, setCardData] = useState([
//     { id: 1, title: "Planet One", selectedPlanet: null, selectedVehicle: null },
//     { id: 2, title: "Planet Two", selectedPlanet: null, selectedVehicle: null },
//     {
//       id: 3,
//       title: "Planet Three",
//       selectedPlanet: null,
//       selectedVehicle: null
//     },
//     { id: 4, title: "Planet Four", selectedPlanet: null, selectedVehicle: null }
//   ]);

//   const [selectedPlanets, setSelectedPlanets] = useState([]);
//   const [selectedVehicles, setSelectedVehicles] = useState([]);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     axios
//       .all([
//         axios.get("https://findfalcone.geektrust.com/planets"),
//         axios.get("https://findfalcone.geektrust.com/vehicles")
//       ])
//       .then(
//         axios.spread((planetsResponse, vehiclesResponse) => {
//           setPlanets(planetsResponse.data);
//           setVehicles(vehiclesResponse.data);
//         })
//       )
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handlePlanetSelect = (cardIndex, planetName) => {
//     const selectedPlanet = planets.find((planet) => planet.name === planetName);
//     if (!selectedPlanet) return;

//     // Push the selected planet into the array
//     const updatedSelectedPlanets = [...selectedPlanets];
//     updatedSelectedPlanets[cardIndex] = planetName;
//     setSelectedPlanets(updatedSelectedPlanets);

//     const updatedCardData = [...cardData];
//     updatedCardData[cardIndex].selectedPlanet = selectedPlanet;
//     updatedCardData[cardIndex].selectedVehicle = null;
//     setCardData(updatedCardData);

//     onTimeUpdate(updatedCardData, vehicles);
//   };

//   const handleVehicleSelect = (cardIndex, vehicleName) => {
//     // Push the selected vehicle into the array
//     const updatedSelectedVehicles = [...selectedVehicles];
//     updatedSelectedVehicles[cardIndex] = vehicleName;
//     setSelectedVehicles(updatedSelectedVehicles);

//     const updatedCardData = [...cardData];
//     updatedCardData[cardIndex].selectedVehicle = vehicleName;
//     setCardData(updatedCardData);

//     onTimeUpdate(updatedCardData, vehicles);
//   };

//   const isSelectionComplete = cardData.every(
//     (card) => card.selectedPlanet && card.selectedVehicle
//   );

//   const getToken = () => {
//     axios
//       .post("https://findfalcone.geektrust.com/token", null, {
//         headers: {
//           Accept: "application/json"
//         }
//       })
//       .then((response) => {
//         setToken(response.data.token);
//         console.log("Token:", response.data.token);
//       })
//       .catch((error) => {
//         console.error("Error fetching token:", error);
//       });
//   };

//   useEffect(() => {
//     if (isSelectionComplete && token === null) {
//       console.log("Selected Planets:", selectedPlanets);
//       console.log("Selected Vehicles:", selectedVehicles);
//       getToken();
//     }
//   }, [isSelectionComplete, token]);

//   const isVehicleAvailable = (cardIndex, vehicleName) => {
//     const selectedPlanet = cardData[cardIndex].selectedPlanet;
//     if (!selectedPlanet) return false;

//     const selectedVehicle = vehicles.find(
//       (vehicle) => vehicle.name === vehicleName
//     );
//     if (!selectedVehicle) return false;

//     const vehicleInSelection = cardData.some(
//       (card, index) =>
//         index !== cardIndex &&
//         card.selectedPlanet?.name === selectedPlanet.name &&
//         card.selectedVehicle === vehicleName
//     );

//     return (
//       selectedVehicle.total_no > 0 &&
//       selectedVehicle.max_distance >= selectedPlanet.distance &&
//       !vehicleInSelection
//     );
//   };

//   const findFalcone = async () => {
//     const body = {
//       token: token,
//       planet_names: selectedPlanets,
//       vehicle_names: selectedVehicles
//     };

//     try {
//       const response = await axios.post(
//         "https://findfalcone.geektrust.com/find",
//         body,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       const data = response.data;
//       console.log("Response:", data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="card-grid">
//         {cardData.map((card, index) => (
//           <div className="card" key={card.id}>
//             <h3>{card.title}</h3>
//             <select
//               value={card.selectedPlanet ? card.selectedPlanet.name : ""}
//               onChange={(event) =>
//                 handlePlanetSelect(index, event.target.value)
//               }
//             >
//               <option value="">
//                 {card.selectedPlanet
//                   ? `${card.selectedPlanet.name}`
//                   : "Select a planet"}
//               </option>
//               {planets.map((planet) => (
//                 <option
//                   key={planet.name}
//                   value={planet.name}
//                   disabled={
//                     cardData.some(
//                       (otherCard) =>
//                         otherCard.selectedPlanet?.name === planet.name &&
//                         otherCard !== card
//                     ) || card.selectedPlanet?.name === planet.name
//                   }
//                 >
//                   {planet.name}
//                 </option>
//               ))}
//             </select>
//             {card.selectedPlanet && (
//               <div>
//                 <label>Select a Vehicle:</label>
//                 <div className="radio-buttons">
//                   {vehicles.map((vehicle) => (
//                     <label key={vehicle.name}>
//                       <input
//                         type="radio"
//                         name={`vehicle-${index}`}
//                         value={vehicle.name}
//                         onChange={() =>
//                           handleVehicleSelect(index, vehicle.name)
//                         }
//                         disabled={!isVehicleAvailable(index, vehicle.name)}
//                         checked={card.selectedVehicle === vehicle.name}
//                       />
//                       {`${vehicle.name} (Max Distance: ${vehicle.max_distance}, Speed: ${vehicle.speed}, Quantity: ${vehicle.total_no})`}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <button className="findfalcone" onClick={findFalcone}>
//         Find Falcone
//       </button>
//     </div>
//   );
// }

// export default CardGrid;
