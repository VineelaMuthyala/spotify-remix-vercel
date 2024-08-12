import {BiError} from 'react-icons/bi'
import './index.css'

const FailurePage = () => {
  const getUserStoriesListAPIUrl = () => {
    console.log('userStoriesListAPIUrl')
  }

  return (
    <div className="failure-container">
      <div className="error-icon-container">
        <BiError className="error-icon" />
      </div>
      <p className="error-text">Something went wrong. Please try again</p>
      <button
        className="try-again-button"
        type="button"
        onClick={getUserStoriesListAPIUrl}
      >
        Try again
      </button>
    </div>
  )
}

export default FailurePage
