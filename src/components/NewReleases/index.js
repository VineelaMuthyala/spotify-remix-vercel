import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NewReleases extends Component {
  render() {
    const {newReleases} = this.props
    const {name, id, images} = newReleases
    const {url} = images
    return (
      <Link to={`/album/${id}`} className="link-style">
        <li className="n-list-item-container">
          <img src={url} alt="new release album" className="n-list-image" />
          <p className="n-list-item-name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default NewReleases
