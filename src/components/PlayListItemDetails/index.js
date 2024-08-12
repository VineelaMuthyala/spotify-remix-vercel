import {Component} from 'react'
import SpotifyContext from '../../context/SpotifyContext'
import TrackItemDetails from '../TrackItemDetails'

import './index.css'

class PlayListItemDetails extends Component {
  render() {
    const {tracksList, coverDetails} = this.props
    const {name, images} = coverDetails

    return (
      <SpotifyContext.Consumer>
        {value => {
          const {selectedTrackId} = value

          return (
            <div className="body-container">
              <div className="track-cover-container">
                <img src={images} alt="cover" className="track-cover-image" />
                <div className="track-cover-text-container">
                  <p className="track-cover-text-title">Players List</p>
                  <h1 className="track-cover-heading">{name}</h1>
                  <p className="track-cover-text">
                    {tracksList[0].track.artists}
                  </p>
                </div>
              </div>

              <div className="track-table-titles-container">
                <p className="table-tracks">Tracks</p>
                <p className="table-album">Album</p>
                <p className="table-time">Time</p>
                <p className="table-artist">Artist</p>
                <p className="table-added">Added</p>
              </div>
              <hr className="line" />
              <ul className="tracks-items-container">
                {tracksList.map((eachItem, index) => (
                  <TrackItemDetails
                    key={eachItem.track.id}
                    trackItem={eachItem}
                    serialNo={index + 1}
                    isSelected={eachItem.track.id === selectedTrackId}
                  />
                ))}
              </ul>
            </div>
          )
        }}
      </SpotifyContext.Consumer>
    )
  }
}

export default PlayListItemDetails
