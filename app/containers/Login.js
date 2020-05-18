import React, { Component } from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Button, InputItem, List, Card } from '@ant-design/react-native'
import { Touchable } from '../components'

import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
            // <Button text="Login" onPress={this.onLogin} />
            <Card style={{ width:300 }} >
              <Card.Header
                title="登录"
              />
              <Card.Body>
                <List>
                  <InputItem
                    clear
                    placeholder="账号"
                  >
                    账号
                  </InputItem>
                  <InputItem
                    clear
                    placeholder="密码"
                  >
                    密码
                  </InputItem>
                  <List.Item>
                    <Button
                      onPress={this.onLogin}
                      type="primary"
                    >
                      登录
                    </Button>
                  </List.Item>
                </List>
              </Card.Body>
              <Card.Footer
                content="Power by Tyto"
              />
            </Card>
          )}
        {!fetching && (
          <Touchable style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.icon}
              source={require('../images/close.png')}
            />
          </Touchable>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
})

export default Login
