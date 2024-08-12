import {Link} from 'react-router-dom'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-page">
    <SideBar />
    <div className="not-found-container">
      <Header />
      <div className="container-404">
        <img
          src="https://res.cloudinary.com/dtf1kbume/image/upload/v1718708563/Frame_153Frame_404_dqynov.png"
          alt="page not found"
        />
        <h1 className="text-404">Page Not Found</h1>
        <Link to="/" className="link-style">
          <button className="not-found-home-page-btn" type="button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default PageNotFound
