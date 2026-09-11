import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import AboutUs from './pages/AboutUs';
import TestPage from './pages/TestPage';
import Result from './pages/Result';
import Grain from './pages/Grain';
import GrainInfo from './pages/GrainInfo';
import ProtectedRoute from './Components/Protected';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AboutUs />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/grain" element={<Grain />} />
      <Route path="/grain/:riceName" element={<GrainInfo />} />

      <Route
        path="/test"
        element={
          <ProtectedRoute>
            <TestPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;
