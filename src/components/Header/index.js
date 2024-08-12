import {FaArrowLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-container">
    <Link to="/" className="link-style">
      <button className="back-button-container" type="button">
        <FaArrowLeft className="arrow-icon" />
        <p className="back-text">Back</p>
      </button>
    </Link>
  </div>
)

export default Header
