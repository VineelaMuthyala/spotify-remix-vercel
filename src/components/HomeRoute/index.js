import {Component} from 'react'
import Cookies from 'js-cookie'

import SideBar from '../SideBar'
import PlayList from '../PlayList'
import Categories from '../Categories'
import NewReleases from '../NewReleases'
import FailurePage from '../FailurePage'
import LoadingPage from '../LoadingPage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    featuredPlayList: [],
    categories: [],
    newReleases: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTheLists()
  }

  getUpdatedPlayLists = data => ({
    externalUrls: {
      spotify: data.external_urls.spotify,
    },
    herf: data.herf,
    id: data.id,
    images: {
      url: data.images[0].url,
    },
    name: data.name,
    tracks: {
      herf: data.tracks.herf,
      total: data.tracks.total,
    },
    type: data.type,
    description: data.description,
  })

  getUpdatedCategoriesList = data => ({
    icons: {
      url: data.icons[0].url,
    },
    id: data.id,
    name: data.name,
  })

  getUpdatedNewReleasesList = data => ({
    name: data.name,
    id: data.id,
    images: {
      url: data.images[0].url,
    },
  })

  getTheLists = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const {jwtToken} = Cookies.get('jwt_token')
      const featuredPlayListsUrl =
        'https://apis2.ccbp.in/spotify-clone/featured-playlists'
      const categoriesListUrl = 'https://apis2.ccbp.in/spotify-clone/categories'
      const newReleasesListUrl =
        'https://apis2.ccbp.in/spotify-clone/new-releases'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const featuredPlayListResponse = await fetch(
        featuredPlayListsUrl,
        options,
      )
      const featuredPlayListData = await featuredPlayListResponse.json()
      const playList = featuredPlayListData.playlists.items
      console.log('playlist', featuredPlayListData)
      const updatedPlayLists = await playList.map(eachItem =>
        this.getUpdatedPlayLists(eachItem),
      )
      console.log('update Playlist', updatedPlayLists)

      const categoriesListResponse = await fetch(categoriesListUrl, options)
      const categoriesListData = await categoriesListResponse.json()
      const categoriesList = categoriesListData.categories.items
      console.log('category', categoriesListData)
      const updatedCategoriesList = categoriesList.map(eachItem =>
        this.getUpdatedCategoriesList(eachItem),
      )

      const newReleasesListResponse = await fetch(newReleasesListUrl, options)
      const newReleasesListData = await newReleasesListResponse.json()
      const newReleasesList = newReleasesListData.albums.items
      console.log('new', newReleasesList)
      const updatedNewReleasesList = newReleasesList.map(eachItem =>
        this.getUpdatedNewReleasesList(eachItem),
      )

      this.setState({
        featuredPlayList: updatedPlayLists,
        categories: updatedCategoriesList,
        newReleases: updatedNewReleasesList,
        apiStatus: apiStatusConstants.success,
      })
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPlayList = () => {
    const {featuredPlayList} = this.state
    return (
      <ul className="lists-container">
        {featuredPlayList.map(eachItem => (
          <PlayList key={eachItem.id} playListItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderCategories = () => {
    const {categories} = this.state
    return (
      <ul className="lists-container">
        {categories.map(eachItem => (
          <Categories key={eachItem.id} categories={eachItem} />
        ))}
      </ul>
    )
  }

  renderNewReleases = () => {
    const {newReleases} = this.state
    return (
      <ul className="lists-container">
        {newReleases.map(eachItem => (
          <NewReleases key={eachItem.id} newReleases={eachItem} />
        ))}
      </ul>
    )
  }

  renderHomePageSuccess = () => (
    <>
      <div className="home-page-container">
        <SideBar />
        <div className="home-body-container">
          <h1 className="home-playlist-heading">Editors Picks</h1>
          {this.renderPlayList()}
          <h1 className="home-playlist-heading">Genres & Moods</h1>
          {this.renderCategories()}
          <h1 className="home-playlist-heading">New Releases</h1>
          {this.renderNewReleases()}
        </div>
      </div>
    </>
  )

  renderHomePageFailure = () => (
    <div className="home-page-container">
      <SideBar />
      <div className="home-body-container">
        <p className="home-playlist-heading">Popular Playlists</p>
        <div className="home-playList-failure">
          <FailurePage />
        </div>
        <p className="home-playlist-heading">Categories</p>
        <div className="home-playList-failure">
          <FailurePage />
        </div>
        <p className="home-playlist-heading">New Releases</p>
        <div className="home-playList-failure">
          <FailurePage />
        </div>
      </div>
    </div>
  )

  renderHomePageLoading = () => (
    <div className="Loading-page-container">
      <div className="loading-page-body">
        <p className="Loading-page-heading">Popular Playlists</p>
        <div className="Loading-page" data-testid="loader">
          <LoadingPage />
        </div>
        <p className="Loading-page-heading" data-testid="loader">
          Categories
        </p>
        <div className="Loading-page">
          <LoadingPage />
        </div>
        <p className="Loading-page-heading" data-testid="loader">
          New Releases
        </p>
        <div className="Loading-page">
          <LoadingPage />
        </div>
      </div>
    </div>
  )

  renderHomePage = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderHomePageLoading()
      case apiStatusConstants.success:
        return this.renderHomePageSuccess()
      case apiStatusConstants.failure:
        return this.renderHomePageFailure()
      default:
        return null
    }
  }

  render() {
    return <div className="home-container">{this.renderHomePage()}</div>
  }
}

export default HomeRoute
