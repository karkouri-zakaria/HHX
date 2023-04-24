import React, { useState, useEffect, useCallback, useContext } from 'react';
import Logo from '../../static/IMG/Logopng.png';
import Authentification from '../Control Panel/Authentification';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Control Panel/Auth-Context';

export default function Navbar (){
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext)
    const navigate = useNavigate();

    localStorage.getItem("token")

    const handleScroll = useCallback(() => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    }, [prevScrollPos]);
  
    const handleModalOpen = () => {
      setIsModalOpen(true);
    }
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    }
  
    const handleLogout = () => {
      logout();
  
      if (window.location.pathname !== '/') {
        navigate("/")
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [handleScroll]);

    useEffect(() => {
        if (isAuthenticated) {
          handleModalClose();
        }
      }, [isAuthenticated]);      
    
    return(
        <div>
            {isModalOpen && (
            <div class="modal">
                <button class="close-button" aria-label="Close" onClick={handleModalClose}>
                <span class="sr-only"></span>
                </button>
                <Authentification />
            </div>
            )}

            <header className={(!isModalOpen ? visible : true) ? 'header header-visible' : 'header header-hidden'}>
                <nav className="navbar">
                <Link to="/">
                    <div className="navbar-logo">
                    <img src={Logo} alt="Logo" />
                    <span className="navbar-logo-text">HydraHubX</span>
                    </div>
                </Link>
                <ul className="navbar-links">
                    <li><button>{localStorage.getItem("name")}</button></li>
                    {!isAuthenticated && (<li><button onClick={handleModalOpen}>Login</button></li>)}
                    {isAuthenticated && (<Link to="/Search"><li><button>Search</button></li></Link>)}
                    {isAuthenticated && (<Link to="/Mail"><li><button>Mail</button></li></Link>)}
                    {isAuthenticated && (<li><button onClick={handleLogout}>Logout</button></li>)}
                </ul>
                </nav>
            </header>
        </div>
    )
}