import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from '../utils'

@connect(({ app }) => ({ app }))
class BasicPage extends Component {

  componentDidMount() {
    const { app } = this.props
    const { login } = app
    if (!login) {
      this.gotoLogin()
    }
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  render() {
    const { children } = this.props
    return (
      <View>
        {children}
      </View>
    )
  }
}

export default BasicPage