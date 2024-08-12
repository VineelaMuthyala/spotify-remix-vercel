import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

import SideBar from '../SideBar'
import Header from '../Header'
import LoadingPage from '../LoadingPage'
import FailurePage from '../FailurePage'
import CategoryItemDetails from '../CategoryItemDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CategoryItem extends Component {
  state = {categoryItemList: []}

  componentDidMount() {
    this.getCategoryItemDetails()
  }

  getUpdatedCategoryPlayList = data => ({
    description: data.description,
    href: data.href,
    name: data.name,
    snapshotId: data.snapshot_id,
    tracks: {
      href: data.href,
      type: data.type,
      uri: data.uri,
    },
    images: {
      url: data.images[0].url,
    },
  })

  getCategoryItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params
      console.log('categoryID', id)
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()
      const categoryPlaylist = fetchedData.playlists.items
      const updatedCategoryPlayList = categoryPlaylist.map(eachItem =>
        this.getUpdatedCategoryPlayList(eachItem),
      )

      console.log('categoryItem', updatedCategoryPlayList)
      this.setState({
        categoryItemList: updatedCategoryPlayList,
        apiStatus: apiStatusConstants.success,
      })
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCategoryItemSuccess = () => {
    const {categoryItemList, apiStatus} = this.state
    console.log(apiStatus)

    return (
      <>
        <div className="category-item-page">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="category-item-container">
            <Header />
            <h1 className="category-heading">Category</h1>
            <div className="category-list-item-details">
              {categoryItemList.map(eachItem => (
                <CategoryItemDetails
                  categoryItemList={eachItem}
                  key={eachItem.name}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  renderCategotyItemFailure = () => (
    <div className="category-failure-page">
      <div className="category-failure-container">
        <Header />
        <div className="category-item-failure-container">
          <FailurePage />
        </div>
      </div>
    </div>
  )

  renderCategoryItemPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCategoryItemSuccess()
      case apiStatusConstants.failure:
        return this.renderCategotyItemFailure()
      case apiStatusConstants.inProgress:
        return <LoadingPage />
      default:
        return null
    }
  }

  render() {
    return <>{this.renderCategoryItemPage()}</>
  }
}
export default CategoryItem
