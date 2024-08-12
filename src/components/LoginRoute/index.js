import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMsg: '', errorStatus: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginFrom = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error, errorStatus: true})
  }

  render() {
    const {username, password, errorMsg, errorStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-details-container">
          <div className="logo-heading-container">
            <img
              className="spotify-logo"
              alt="login website logo"
              src="https://res.cloudinary.com/dtf1kbume/image/upload/v1718704657/musicspotifyLogo_h3lzpo.png"
            />
            <h1 className="spotify-heading">Spotify Remix</h1>
          </div>

          <form className="form-container" onSubmit={this.onSubmitLoginFrom}>
            <div className="inputs">
              <div className="input-container">
                <label className="label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  className="input-text"
                  type="text"
                  id="username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="input-text"
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
            </div>
            <div className="button-container">
              <button className="login-button" type="submit">
                LOGIN
              </button>
              {errorStatus && <p className="error-msg">* {errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
