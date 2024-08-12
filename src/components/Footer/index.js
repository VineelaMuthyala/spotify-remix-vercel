import {Component, createRef} from 'react'

import {
  FaVolumeUp,
  FaPlayCircle,
  FaVolumeMute,
  FaPauseCircle,
} from 'react-icons/fa'

import SpotifyContext from '../../context/SpotifyContext'

import './index.css'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.audioElement = createRef() // Create a ref for the audio element
    this.state = {
      isPlaying: false,
      volume: 1, // Volume range: 0 to 1
      currentTime: 0, // Track current playback time
      duration: 0,
    }
  }

  componentDidMount() {
    const audio = this.audioElement.current
    console.log('Didmount', audio)
    if (audio) {
      audio.addEventListener('loadedmetadata', this.handleMetadataLoad)
      audio.addEventListener('timeupdate', this.handleTimeUpdate)
    }
  }

  componentWillUnmount() {
    const audio = this.audioElement.current
    console.log('unmount', audio)
    if (audio) {
      audio.removeEventListener('loadedmetadata', this.handleMetadataLoad)
      audio.removeEventListener('timeupdate', this.handleTimeUpdate)
    }
  }

  handleMetadataLoad = () => {
    const audio = this.audioElement.current
    if (audio) {
      this.setState({duration: audio.duration})
    }
  }

  handleTimeUpdate = () => {
    const audio = this.audioElement.current
    if (audio) {
      this.setState({currentTime: audio.currentTime})
    }
  }

  renderPopup = () => (
    <div className="popup-content">
      <p>Sorry, this track does not have a preview URL available.</p>
    </div>
  )

  render() {
    const {isPlaying, volume, duration, currentTime} = this.state

    return (
      <SpotifyContext.Consumer>
        {value => {
          const {coverDetails} = this.props
          const {images} = coverDetails
          const {footerDetails} = value
          const {previewUrl, artists, name} = footerDetails

          const handlePlayPause = () => {
            const audio = this.audioElement.current

            if (audio) {
              if (isPlaying) {
                audio.pause()
              } else {
                audio.play()
              }
              this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
            }
          }

          const handleVolumeChange = e => {
            const volumeChanged = e.target.value

            const audio = this.audioElement.current
            if (audio) {
              audio.volume = volumeChanged
            }
            this.setState({volume: volumeChanged})
          }

          const formatTime = time => {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
          }

          const handleSliderChange = event => {
            const time = event.target.value
            const audio = this.audioElement.current
            if (audio) {
              audio.currentTime = (time / 100) * audio.duration
            }
          }
          console.log(previewUrl)
          return (
            <div className="footer-page">
              <div className="footer-item-container">
                {previewUrl === null ? (
                  <>{this.renderPopup()}</>
                ) : (
                  <>
                    <div className="footer">
                      <img
                        src={images}
                        alt="footer 2"
                        className="footer-image"
                      />
                      <div className="footer-item-text-container">
                        <p className="footer-item-heading">{name}</p>
                        <p className="footer-item-text">{artists}</p>
                      </div>
                    </div>
                    <audio
                      ref={this.audioElement}
                      src={previewUrl}
                      type="audio/mp3"
                      className="audio-style"
                    >
                      <source src={previewUrl} type="audio/mp3" />
                      <track kind="captions" label="English captions" />
                    </audio>
                  </>
                )}
                <div className="play-pause-container">
                  <button
                    onClick={handlePlayPause}
                    className="play-button"
                    type="button"
                  >
                    {isPlaying ? (
                      <FaPauseCircle className="play-pause" />
                    ) : (
                      <FaPlayCircle className="play-pause" />
                    )}
                  </button>
                  <span className="playback-time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <input
                    type="range"
                    id="progress-slider"
                    className="progress-slider"
                    min="0"
                    max="100"
                    step="0.1"
                    value={(currentTime / duration) * 100}
                    onChange={handleSliderChange}
                  />
                </div>
                <div className="volume-container">
                  {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>
              </div>
            </div>
          )
        }}
      </SpotifyContext.Consumer>
    )
  }
}
export default Footer
