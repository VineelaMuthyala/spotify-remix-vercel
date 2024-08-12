import {Component} from 'react'
import Cookies from 'js-cookie'

import SideBar from '../SideBar'
import Header from '../Header'
import PlayListItemDetails from '../PlayListItemDetails'
import Footer from '../Footer'
import LoadingPage from '../LoadingPage'
import FailurePage from '../FailurePage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PlayListItem extends Component {
  state = {
    coverDetails: {},
    tracksList: [],
    trackOneName: '',
    trackOneArtist: '',
    trackOneUrl: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPlayListItemDetails()
  }

  getUpdatedTrackDetails = data => ({
    addedAt: data.added_at,

    track: {
      id: data.track.id,
      artists: data.track.artists[0].name,
      durationMs: data.track.duration_ms,
      name: data.track.name,
      previewUrl: data.track.preview_url,
      album: {
        albumType: data.track.album.album_type,
      },
    },
  })

  getCoverDetails = data => ({
    name: data.name,
    images: data.images[0].url,
  })

  getPlayListItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()
      const tracksDetails = fetchedData.tracks.items
      const updatedCoverDetails = this.getCoverDetails(fetchedData)
      const updatedTracksList = tracksDetails.map(eachItem =>
        this.getUpdatedTrackDetails(eachItem),
      )
      console.log('trackList', tracksDetails)
      console.log('Album', fetchedData)
      console.log('updatedTracks', updatedTracksList)
      console.log('coverDetails', updatedCoverDetails)
      this.setState({
        coverDetails: updatedCoverDetails,
        tracksList: updatedTracksList,
        trackOneName: updatedTracksList[0].track.name,
        trackOneArtist: updatedTracksList[0].track.artists,
        trackOneUrl: updatedTracksList[0].track.previewUrl,
        apiStatus: apiStatusConstants.success,
      })
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPlayListItemSuccess = () => {
    const {
      tracksList,
      coverDetails,
      trackOneName,
      trackOneArtist,
      trackOneUrl,
    } = this.state

    return (
      <>
        <div className="p-playlist-item-page">
          <div className="sidebar">
            <SideBar />
          </div>

          <div className="playlist-item-container">
            <Header />
            <PlayListItemDetails
              tracksList={tracksList}
              coverDetails={coverDetails}
            />
            <Footer
              trackOneName={trackOneName}
              trackOneArtist={trackOneArtist}
              trackOneUrl={trackOneUrl}
              coverDetails={coverDetails}
              tracksList={tracksList}
            />
          </div>
        </div>
      </>
    )
  }

  renderPlayListItemFailure = () => (
    <div className="playlist-item-failure-page">
      <Header />
      <div className="playlist-item-failure-container">
        <FailurePage />
      </div>
    </div>
  )

  renderPlayListItemPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlayListItemSuccess()
      case apiStatusConstants.failure:
        return this.renderPlayListItemFailure()
      case apiStatusConstants.inProgress:
        return <LoadingPage />
      default:
        return null
    }
  }

  render() {
    return <>{this.renderPlayListItemPage()}</>
  }
}

export default PlayListItem
