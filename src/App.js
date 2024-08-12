import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import SpotifyContext from './context/SpotifyContext'

import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import PlayListItem from './components/PlayListItem'
import CategoryItem from './components/CategoryItem'
import NewReleasesItem from './components/NewReleasesItem'
import PageNotFound from './components/PageNotFound'

import './App.css'

class App extends Component {
  state = {
    footerDetails: '',
    selectedTrackId: '',
  }

  onClickTrack = id => {
    this.setState({selectedTrackId: id})
  }

  currentTrackDetails = items => {
    this.setState({footerDetails: items})
  }

  render() {
    const {footerDetails, selectedTrackId} = this.state
    console.log('app-footer', footerDetails)

    return (
      <SpotifyContext.Provider
        value={{
          currentTrackDetails: this.currentTrackDetails,
          onClickPlayButton: this.onClickPlayButton,
          onClickMuteButton: this.onClickMuteButton,
          onClickTrack: this.onClickTrack,
          selectedTrackId,
          footerDetails,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/playlist/:id" component={PlayListItem} />
          <ProtectedRoute
            exact
            path="/category/:id/playlists"
            component={CategoryItem}
          />
          <ProtectedRoute exact path="/album/:id" component={NewReleasesItem} />
          <Route path="/not-found" component={PageNotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SpotifyContext.Provider>
    )
  }
}

export default App
