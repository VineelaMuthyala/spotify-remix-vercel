import {Component} from 'react'

import SpotifyContext from '../../context/SpotifyContext'

import './index.css'

class TrackItemDetails extends Component {
  render() {
    const {trackItem, serialNo, isSelected} = this.props

    const {addedAt, track} = trackItem
    const {artists, durationMs, name, previewUrl, album, id} = track
    const {albumType} = album

    const addedDate = new Date(addedAt)
    const presentDate = new Date()
    let result
    /*  const diffYear = differenceInYears(presentDate, addedDate) */
    /* const diffMonths = formatDistance(presentDate, addedDate) */

    // Calculate the difference in years
    const differenceInYears =
      presentDate.getFullYear() - addedDate.getFullYear()

    // Adjust for whether the addedDate's month/day has passed in the current year
    const hasPassedThisYear =
      presentDate.getMonth() < addedDate.getMonth() ||
      (presentDate.getMonth() === addedDate.getMonth() &&
        presentDate.getDate() < addedDate.getDate())

    const adjustedDifferenceInYears = hasPassedThisYear
      ? differenceInYears - 1
      : differenceInYears

    let differenceInMonths =
      (presentDate.getFullYear() - addedDate.getFullYear()) * 12
    differenceInMonths += presentDate.getMonth() - addedDate.getMonth()

    // Adjust for whether the addedDate's day has passed in the current month
    const hasPassedThisMonth = presentDate.getDate() < addedDate.getDate()
    const adjustedDifferenceInMonths = hasPassedThisMonth
      ? differenceInMonths - 1
      : differenceInMonths

    if (adjustedDifferenceInMonths >= 12) {
      result = `${adjustedDifferenceInYears} Years ago`
    } else {
      result = `${adjustedDifferenceInMonths} Months ago`
    }

    const millisecondsToMinutes = milliseconds => {
      // Convert milliseconds to minutes
      const minutes = Math.floor(milliseconds / 60000)
      // Remaining milliseconds after converting to minutes
      const remainingMilliseconds = milliseconds % 60000
      // Convert remaining milliseconds to seconds
      const seconds = Math.round(remainingMilliseconds / 1000)

      return {minutes, seconds}
    }
    const {minutes, seconds} = millisecondsToMinutes(durationMs)
    const formatedMinutes = `0${minutes}`.slice(-2)
    const formatedSeconds = `0${seconds}`.slice(-2)

    return (
      <SpotifyContext.Consumer>
        {value => {
          const {currentTrackDetails, onClickTrack} = value

          const onClickListItem = () => {
            currentTrackDetails({
              previewUrl,
              name,
              artists,
              formatedMinutes,
              formatedSeconds,
              id,
            })
            onClickTrack(id)
          }

          return (
            <li
              className={`track-item-details-container ${
                isSelected ? 'selected' : ''
              }`}
              onClick={onClickListItem}
            >
              <div className="serial-no-box box">{serialNo}</div>
              <div className="name-artists-container">
                <div className="item-name-box box">{name}</div>
                <div className="item-artists-box-small">{artists}</div>
              </div>
              <div className="item-album-box box">{albumType}</div>
              <div className="item-duration-box box">
                {formatedMinutes}:{formatedSeconds}
              </div>
              <div className="item-artists-box box">{artists}</div>

              <div className="item-added-at-box box">{result}</div>
            </li>
          )
        }}
      </SpotifyContext.Consumer>
    )
  }
}

export default TrackItemDetails
