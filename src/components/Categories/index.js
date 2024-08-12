import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Categories extends Component {
  render() {
    const {categories} = this.props
    const {icons, id, name} = categories
    const {url} = icons
    return (
      <Link to={`/category/${id}/playlists`} className="link-style">
        <li className="c-list-item-container">
          <img src={url} alt="category" className="c-list-image" />
          <p className="c-list-item-name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default Categories
