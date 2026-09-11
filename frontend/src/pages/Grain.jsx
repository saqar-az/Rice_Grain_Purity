import "../styles/pages/Grain.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import TextCard from "../Components/TextCard";
import arborio from "../assets/arborio.png";
import basmati from "../assets/basmati.jpg";
import ipsala from "../assets/ipsala.jpg";
import jasmine from "../assets/jasmine.jpg";
import karacadag from "../assets/karacadag.jpg";
import { useNavigate } from "react-router-dom"; 

const riceData = [
  { name: "Arborio", image: arborio, description: "click to read more" },
  { name: "Basmati", image: basmati, description: "click to read more" },
  { name: "Ipsala", image: ipsala, description: "click to read more" },
  { name: "Jasmine", image: jasmine, description: "click to read more" },
  { name: "Karacadag", image: karacadag, description: "click to read more" },
  
];

const Grain = () => {
  const navigate = useNavigate();
  const goToRicePage = (riceName) => {
    navigate(`/grain/${riceName}`);
  };

  return (
    <div className="grain">
      <Navbar />
      <div className="content">
        <div className="grain-title">Rice Grains</div>
        <div className="grain-card-container">
          {riceData.map((rice) => (
            <div
              key={rice.name}
              onClick={() => goToRicePage(rice.name)}
              style={{ cursor: "pointer" }}
            >
              <TextCard
                image={rice.image}
                title={rice.name}
                description={rice.description}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Grain;



