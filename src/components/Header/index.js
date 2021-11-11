import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="header-container">
    <h1 className="logo-heading">
      COVID19<span className="india-text">INDIA</span>
    </h1>

    <Link to="/" className="link">
      <h1 className="home-text">Home</h1>
    </Link>
    <Link to="/about" className="link">
      <h1 className="about-text">About</h1>
    </Link>
  </nav>
)
export default Header
