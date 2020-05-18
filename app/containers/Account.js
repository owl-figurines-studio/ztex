import React, { Component } from 'react'
import { StyleSheet, Text, Image, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { List, Button, WhiteSpace, InputItem, Flex } from '@ant-design/react-native'
import BasicPage from "./BasicPage"
import { createAction, NavigationActions } from '../utils'

const ListItem = List.Item

@connect(({ app }) => ({ ...app }))
class Account extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/person.png')}
      />
    ),
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }

  render() {
    const { login } = this.props
    return (
      <BasicPage>
        <View style={{ paddingTop: 30, height: 1000 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Flex justify="start" align="center" style={{ marginLeft:20, marginTop:10 }} >
              <Image
                style={styles.icon}
                source={require('../images/house.png')}
              />
              <Text style={{ fontSize: 15 }} >张三</Text>
            </Flex>
            <WhiteSpace size="lg" />
            <List renderHeader="基本信息">
              <InputItem
                value="张三"
                editable={false}
              >
                姓名
              </InputItem>
              <InputItem
                value="管理员"
                editable={false}
              >
                权限
              </InputItem>
              <InputItem
                value="123456"
                editable={false}
              >
                账号
              </InputItem>
            </List>
            <WhiteSpace />
            {
              login ? (
                <Button type="warning" onPress={this.logout} >退出</Button>
              ) : (
                  <Button type="primary" onPress={this.gotoLogin} >登录</Button>
                )
            }

            <WhiteSpace />
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

export default Account
