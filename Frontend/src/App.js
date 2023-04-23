import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import DMs from './Components/DMs/DMs';
import DMPage from './Components/DMs/DM';
import Report from './Components/DMs/Report';
import Search from './Components/Search/Search';
import AuthContextProvider from './Components/Control Panel/Auth-Context';
import styles from "./static/CSS/styles.css"
import Authentification from './Components/Control Panel/Authentification';
import Navbar from './Components/Home/Navbar';

const App = () => {

  const currentYear = new Date().getFullYear();

  return (
    <AuthContextProvider>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/DMs" element={<DMs />} />
    <Route path="/Search" element={<Search />} />
    <Route path="/Login" element={<Authentification/>} />
    <Route path="/DM/:id" element={<DMPage />} />
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/Report/:id" element={<Report/>} />
    
    </Routes>
    <footer className="footer">
      <p>&copy; {currentYear} HHX. All Rights Reserved.</p>
    </footer>
    </AuthContextProvider>
  );
};

export default App;
