import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Flex, WingBlank, Card, WhiteSpace } from '@ant-design/react-native'

import { NavigationActions } from '../utils'
import BasicPage from "./BasicPage"


const mapStateToProps = ({ message }) => {
  const { messages } = message
  return {
    messages,
  }
}
@connect(mapStateToProps)
class LookOver extends Component {
  static navigationOptions = {
    tabBarLabel: '查看',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/lookover.png')}
      />
    ),
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'PaperDetail' }))
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
    dispatch(NavigationActions.navigate({ routeName: 'PaperDetail' }))
  }

  render() {
    const { messages } = this.props
    return (
      <BasicPage>
        <View style={{ height: 1000 }}>
          <ScrollView
            style={{ flex: 1 }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <WhiteSpace size="lg" />
            <WingBlank style={{ marginBottom: 5 }}>
              <Flex wrap='wrap' justify="start" >
                {
                  messages.map((item, index) => {
                    const { content, time, title, type } = item
                    const { value: txt } = content.find(contentItem => contentItem.type === 'txt')
                    const shortTxt = txt.length > 20 ? `${txt.substring(0, 20)}...` : txt
                    return (
                      <Card
                        key={index}
                        style={{ width: 160, height: 150, marginLeft: 5, marginTop: 5 }} >
                        <Card.Header
                          title={title}
                          extra={type}
                        />
                        <Card.Body>
                          <TouchableOpacity onPress={() => this.goMessageDetail(index)}>
                            <View style={{ height: 20 }} >
                              <Text style={{ marginLeft: 16 }}>{shortTxt}</Text>
                            </View>
                          </TouchableOpacity>
                        </Card.Body>
                        <Card.Footer
                          content={time}
                        />
                      </Card>
                    )
                  })
                }

              </Flex>
            </WingBlank>
          </ScrollView>
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

export default LookOver
