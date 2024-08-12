import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import LoadingPage from '../LoadingPage'
import FailurePage from '../FailurePage'
import NewReleasesItemDetails from '../NewReleasesItemDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class NewReleasesItem extends Component {
  state = {apiStatus: apiStatusConstants.initial, newReleasesDetails: {}}

  componentDidMount() {
    this.getNewReleasesItemDetails()
  }

  getUpdatedNewReleasesData = data => ({
    href: data.href,
    id: data.id,
    images: data.images[0].url,
    label: data.label,
    name: data.name,
    popularity: data.popularity,
    releaseDate: data.release_date,
    totalTracks: data.total_tracks,
    uri: data.uri,
  })

  getNewReleasesItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()
      const updatedNewReleasesData = this.getUpdatedNewReleasesData(fetchedData)
      console.log('new releases', updatedNewReleasesData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        newReleasesDetails: updatedNewReleasesData,
      })
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNewReleasesItemFailure = () => (
    <>
      <div className="new-item-failure-page">
        <Header />
        <div className="new-item-failure-container">
          <FailurePage />
        </div>
      </div>
    </>
  )

  renderNewReleasesItemSuccess = () => {
    const {newReleasesDetails} = this.state

    return <NewReleasesItemDetails newReleasesDetails={newReleasesDetails} />
  }

  renderNewReleasesItemPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderNewReleasesItemSuccess()
      case apiStatusConstants.failure:
        return this.renderNewReleasesItemFailure()
      case apiStatusConstants.inProgress:
        return <LoadingPage />
      default:
        return null
    }
  }

  render() {
    return <>{this.renderNewReleasesItemPage()}</>
  }
}

export default NewReleasesItem
