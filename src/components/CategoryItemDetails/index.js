import {Component} from 'react'
import './index.css'

class CategoryItemDetails extends Component {
  render() {
    const {categoryItemList} = this.props
    const {name, images} = categoryItemList

    const {url} = images
    return (
      <div className="category-item-details">
        <img src={url} alt="category" className="category-item-image" />
        <div className="category-item-image-text-container">
          <p className="category-item-text">{name}</p>
        </div>
      </div>
    )
  }
}

export default CategoryItemDetails
