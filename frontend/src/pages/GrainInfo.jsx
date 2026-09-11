import TextCardInfo from "../Components/TextCardInfo";
import "../styles/pages/GrainInfo.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import arborio from "../assets/arborio.png";
import basmati from "../assets/basmati.jpg";
import ipsala from "../assets/ipsala.jpg";
import jasmine from "../assets/jasmine.jpg";
import karacadag from "../assets/karacadag.jpg";
import { useParams } from "react-router-dom";

const riceInfo = {
  Arborio: {
    image: arborio,
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet facilisis tincidunt, sapien justo viverra magna, nec fermentum neque lorem in nulla. Integer ac eros ac nulla luctus tincidunt. Suspendisse potenti. Curabitur ac felis ut orci tincidunt tincidunt. Fusce vitae sapien vel justo gravida luctus. Praesent ac orci sed sapien vehicula tincidunt. Nam nec magna nec sapien malesuada fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vel sapien ut libero fermentum dictum. Sed vitae orci sed sapien."]
  },
  Basmati: {
    image: basmati,
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet facilisis tincidunt, sapien justo viverra magna, nec fermentum neque lorem in nulla. Integer ac eros ac nulla luctus tincidunt. Suspendisse potenti. Curabitur ac felis ut orci tincidunt tincidunt. Fusce vitae sapien vel justo gravida luctus. Praesent ac orci sed sapien vehicula tincidunt. Nam nec magna nec sapien malesuada fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vel sapien ut libero fermentum dictum. Sed vitae orci sed sapien."]
  },
  Ipsala: {
    image: ipsala,
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet facilisis tincidunt, sapien justo viverra magna, nec fermentum neque lorem in nulla. Integer ac eros ac nulla luctus tincidunt. Suspendisse potenti. Curabitur ac felis ut orci tincidunt tincidunt. Fusce vitae sapien vel justo gravida luctus. Praesent ac orci sed sapien vehicula tincidunt. Nam nec magna nec sapien malesuada fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vel sapien ut libero fermentum dictum. Sed vitae orci sed sapien."]
  },
  Jasmine: {
    image: jasmine,
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet facilisis tincidunt, sapien justo viverra magna, nec fermentum neque lorem in nulla. Integer ac eros ac nulla luctus tincidunt. Suspendisse potenti. Curabitur ac felis ut orci tincidunt tincidunt. Fusce vitae sapien vel justo gravida luctus. Praesent ac orci sed sapien vehicula tincidunt. Nam nec magna nec sapien malesuada fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vel sapien ut libero fermentum dictum. Sed vitae orci sed sapien."]
  },
  Karacadag: {
    image: karacadag,
    text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet facilisis tincidunt, sapien justo viverra magna, nec fermentum neque lorem in nulla. Integer ac eros ac nulla luctus tincidunt. Suspendisse potenti. Curabitur ac felis ut orci tincidunt tincidunt. Fusce vitae sapien vel justo gravida luctus. Praesent ac orci sed sapien vehicula tincidunt. Nam nec magna nec sapien malesuada fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vel sapien ut libero fermentum dictum. Sed vitae orci sed sapien."]
  }
};

const GrainInfo = () => {

  const { riceName } = useParams();
  const rice = riceInfo[riceName];

  if (!rice) {
    return <div>Rice not found</div>;
  }
  return (
    <div className="at">
      <div className="at-navbar-container">
        <Navbar />
      </div>
      <div className="at-container">
        <TextCardInfo
          picture={rice.image}
          title={riceName}
          text={rice.text}
        />
      </div>
      <Footer /> 
    </div>
  );
};
export default GrainInfo;

