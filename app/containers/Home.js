import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { List, SwipeAction } from '@ant-design/react-native'
import BasicPage from "./BasicPage"


import { NavigationActions } from '../utils'



const mapStateToProps = ({ message }) => {
  const { messages } = message
  return {
    messages,
  }
}
@connect(mapStateToProps)
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '接收',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'MessageDetail' }))
  }

  getRight = index => {
    const right = [
      {
        text: '删除',
        onPress: () => this.deleteMessage(index),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ]
    return right
  }

  getLeft = index => {
    const right = [
      {
        text: '详情',
        onPress: () => this.goMessageDetail(index),
        style: { backgroundColor: 'blue', color: 'white' },
      },
    ]
    return right
  }

  deleteMessage = index => {
    const { dispatch } = this.props
    dispatch({
      type: "message/deleteMessage",
      payload: {
        key: index
      }
    })
  }

  goMessageDetail = index => {
    console.log(index)
    const { dispatch, messages } = this.props
    dispatch({
      type: "message/updateCurrentMessage",
      payload: {
        currentMessage: messages[index]
      },
    })
    dispatch(NavigationActions.navigate({ routeName: 'MessageDetail' }))
  }

  render() {
    const { messages } = this.props
    return (
      <BasicPage>
        <View style={{ paddingTop: 30 }}>
          <List>
            {
              messages.map((item, index) => {
                const { content, time } = item
                const { value: txt } = content.find(contentItem => contentItem.type === 'txt')
                return (
                  <SwipeAction
                    key={index}
                    autoClose
                    style={{ backgroundColor: 'transparent' }}
                    right={this.getRight(index)}
                    left={this.getLeft(index)}
                    onOpen={() => console.log('open')}
                    onClose={() => console.log('close')}
                  >
                    <List.Item extra={time}>
                      {txt}
                    </List.Item>
                  </SwipeAction>
                )
              })
            }

          </List>
        </View>
      </BasicPage>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Home
