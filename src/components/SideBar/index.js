import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdLogOut} from 'react-icons/io'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const SideBar = props => {
  const onClickLogout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="sidebar-container">
      <img
        src="https://res.cloudinary.com/dtf1kbume/image/upload/v1718704657/musicspotifyLogo_h3lzpo.png"
        alt="website logo"
        className="sidebar-logo"
      />
      <div className="logout-icon-container">
        <IoMdLogOut className="logout-icon" onClick={onClickLogout} />
        <GiHamburgerMenu className="burger" onClick={onClickLogout} />
        <button className="logout-btn" type="button">
          <p className="logout-text">Logout</p>
        </button>
      </div>
    </div>
  )
}
export default withRouter(SideBar)
