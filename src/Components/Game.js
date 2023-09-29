import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Vehicles from "./Vehicles";
import Hideout from "./Hideout";
import Modal from "./Modal";
// import "./CardGrid.css";
import "./Game.css";

function Game() {
  const [timeTaken, setTimeTaken] = useState(0);
  const [token, setToken] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleCounts, setVehicleCounts] = useState({});
  const [cardData, setCardData] = useState([
    { id: 1, title: "Planet One", selectedPlanet: null, selectedVehicle: null },
    { id: 2, title: "Planet Two", selectedPlanet: null, selectedVehicle: null },
    {
      id: 3,
      title: "Planet Three",
      selectedPlanet: null,
      selectedVehicle: null,
    },
    {
      id: 4,
      title: "Planet Four",
      selectedPlanet: null,
      selectedVehicle: null,
    },
  ]);
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});

  useEffect(() => {
    axios
      .all([
        axios.get("https://findfalcone.geektrust.com/planets"),
        axios.get("https://findfalcone.geektrust.com/vehicles"),
      ])
      .then(
        axios.spread((planetsResponse, vehiclesResponse) => {
          setPlanets(planetsResponse.data);

          setVehicles(vehiclesResponse.data);
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Calculate total time taken based on  planets and vehicles
  const calculateTimeTaken = (updatedCardData) => {
    let totalTime = 0;
    updatedCardData.forEach((card) => {
      if (card.selectedPlanet && card.selectedVehicle) {
        const selectedVehicle = vehicles.find(
          (vehicle) => vehicle.name === card.selectedVehicle
        );
        if (selectedVehicle) {
          totalTime += card.selectedPlanet.distance / selectedVehicle.speed;
        }
      }
    });
    return totalTime;
  };

  // Check if the selection is complete
  const isSelectionComplete = cardData.every(
    (card) => card.selectedPlanet && card.selectedVehicle
  );

  // Fetch the token
  useEffect(() => {
    if (isSelectionComplete && !token) {
      axios
        .post("https://findfalcone.geektrust.com/token", null, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((response) => {
          setToken(response.data.token);
          console.log("Token:", response.data.token);
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
        });
    }
  }, [isSelectionComplete, token]);

  // Check if a vehicle is available for selection
  const isVehicleAvailable = (cardIndex, vehicleName) => {
    const selectedPlanet = cardData[cardIndex].selectedPlanet;
    if (!selectedPlanet) return false;

    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.name === vehicleName
    );
    if (!selectedVehicle) return false;

    const vehicleInSelection = cardData.some(
      (card, index) =>
        index !== cardIndex &&
        card.selectedPlanet?.name === selectedPlanet.name &&
        card.selectedVehicle === vehicleName
    );

    return (
      selectedVehicle.total_no > 0 &&
      selectedVehicle.max_distance >= selectedPlanet.distance &&
      !vehicleInSelection
    );
  };

  const handlePlanetSelect = (cardIndex, planetName) => {
    const selectedPlanet = planets.find((planet) => planet.name === planetName);
    if (!selectedPlanet) return;

    const updatedSelectedPlanets = [...selectedPlanets];
    updatedSelectedPlanets[cardIndex] = planetName;
    setSelectedPlanets(updatedSelectedPlanets);

    const updatedCardData = [...cardData];
    updatedCardData[cardIndex].selectedPlanet = selectedPlanet;
    updatedCardData[cardIndex].selectedVehicle = null;
    setCardData(updatedCardData);

    const updatedTime = calculateTimeTaken(updatedCardData);
    setTimeTaken(updatedTime);
  };

  const handleVehicleSelect = (cardIndex, vehicleName) => {
    const updatedCardData = [...cardData];
    const selectedCard = updatedCardData[cardIndex];
    const previousVehicleName = selectedCard.selectedVehicle;

    // Find the vehicle data by name
    const vehicle = vehicles.find((v) => v.name === vehicleName);
    const previousVehicle = vehicles.find(
      (v) => v.name === previousVehicleName
    );

    if (previousVehicleName) {
      // Increment the count of the previously selected vehicle
      setVehicles((prevVehicles) =>
        prevVehicles.map((prevVehicle) =>
          prevVehicle.name === previousVehicleName
            ? { ...prevVehicle, total_no: prevVehicle.total_no + 1 }
            : prevVehicle
        )
      );
    }

    if (previousVehicleName === vehicleName) {
      // If  same vehicle is deselected, clear the selected vehicle
      selectedCard.selectedVehicle = null;
    } else {
      // different vehicle is  selected, then we need to check if it's available
      const isAvailable = isVehicleAvailable(cardIndex, vehicleName);

      if (isAvailable) {
        // Decrement the count if greater than zero
        if (vehicle.total_no > 0) {
          setVehicles((prevVehicles) =>
            prevVehicles.map((prevVehicle) =>
              prevVehicle.name === vehicleName
                ? { ...prevVehicle, total_no: prevVehicle.total_no - 1 }
                : prevVehicle
            )
          );

          // Update the selected vehicle
          selectedCard.selectedVehicle = vehicleName;

          // Update selectedVehicles state
          const updatedSelectedVehicles = [...selectedVehicles];
          updatedSelectedVehicles[cardIndex] = vehicleName;
          setSelectedVehicles(updatedSelectedVehicles);
        }
      } else {
        // Vehicle is not available, do not change the selection
        return;
      }
    }

    setCardData(updatedCardData);

    const updatedTime = calculateTimeTaken(updatedCardData);
    setTimeTaken(updatedTime);
  };

  const findFalcone = async () => {
    if (!isSelectionComplete) {
      console.log("Selection is not complete");
      return;
    }

    const body = {
      token: token,
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };

    console.log("Request body:", body);

    try {
      const response = await axios.post(
        "https://findfalcone.geektrust.com/find",
        body,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Response:", data);

      if (data.status === "false") {
        setPopupData({
          timeTaken: timeTaken,
          planetName: null,
        });

        setShowPopup(true);
      } else if (data.status === "success") {
        setPopupData({
          timeTaken: timeTaken,
          planetName: data.planet_name,
        });

        setShowPopup(true);
      } else {
        console.log("Unexpected status:", data.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetGame = () => {
    setSelectedPlanets([]);
    setSelectedVehicles([]);
    setTimeTaken(0);
    setCardData([
      {
        id: 1,
        title: "Planet One",
        selectedPlanet: null,
        selectedVehicle: null,
      },
      {
        id: 2,
        title: "Planet Two",
        selectedPlanet: null,
        selectedVehicle: null,
      },
      {
        id: 3,
        title: "Planet Three",
        selectedPlanet: null,
        selectedVehicle: null,
      },
      {
        id: 4,
        title: "Planet Four",
        selectedPlanet: null,
        selectedVehicle: null,
      },
    ]);

    window.location.reload();
  };

  return (
    <div>
      <Header />

      <div>
        <Vehicles />
      </div>

      <div>
        <Hideout />
      </div>
      <div>
        <h2>Select the planets you want to search in</h2>
      </div>
      <div className="timeresetContainer">
        <div className="timeTaken">
          <h2>Time Taken: {timeTaken} </h2>
        </div>
        <div className="resetGame">
          <button className="resetButton" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>

      <div className="card-grid">
        {cardData.map((card, index) => (
          <div className="card" key={card.id}>
            <h3>{card.title}</h3>
            <select
              value={card.selectedPlanet ? card.selectedPlanet.name : ""}
              onChange={(event) =>
                handlePlanetSelect(index, event.target.value)
              }
            >
              <option value="">
                {card.selectedPlanet
                  ? `${card.selectedPlanet.name}`
                  : "Select a planet"}
              </option>
              {planets.map((planet) => (
                <option
                  key={planet.name}
                  value={planet.name}
                  disabled={
                    cardData.some(
                      (otherCard) =>
                        otherCard.selectedPlanet?.name === planet.name &&
                        otherCard !== card
                    ) || card.selectedPlanet?.name === planet.name
                  }
                >
                  {planet.name}
                </option>
              ))}
            </select>
            {card.selectedPlanet && (
              <div>
                <div className="radio-buttons">
                  {vehicles.map((vehicle) => (
                    <label key={vehicle.name}>
                      <input
                        type="radio"
                        name={`vehicle-${index}`}
                        value={vehicle.name}
                        onChange={() =>
                          handleVehicleSelect(index, vehicle.name)
                        }
                        disabled={!isVehicleAvailable(index, vehicle.name)}
                        checked={card.selectedVehicle === vehicle.name}
                      />
                      {`${vehicle.name}(${vehicle.total_no})`}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isSelectionComplete && (
        <button className="findfalcone" onClick={findFalcone}>
          Find Falcone
        </button>
      )}

      <Footer />

      <Modal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        planetName={popupData.planetName}
        timeTaken={popupData.timeTaken}
        onRestart={resetGame}
      />
    </div>
  );
}

export default Game;
