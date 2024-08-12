import React from 'react'

const SpotifyContext = React.createContext({
  currentTrackDetails: () => {},
  onClickTrack: () => {},
  footerDetails: {},
})
export default SpotifyContext
