import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class PlayList extends Component {
  render() {
    const {playListItem} = this.props
    const {images, name, id, tracks} = playListItem
    const {url} = images
    const totalTracks = tracks.total
    return (
      <Link to={`/playlist/${id}`} className="link-style">
        <li className="p-list-item-container">
          <img src={url} alt="featured playlist" className="p-list-image" />
          <p className="p-list-item-name">{name}</p>
          <p className="total-tracks">{`Total Tracks :${totalTracks}`}</p>
        </li>
      </Link>
    )
  }
}

export default PlayList
