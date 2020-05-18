import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { List, InputItem, TextareaItem, Picker, Provider } from '@ant-design/react-native'
import { Button } from '../components'
import Loading from './Loading'
import { NavigationActions } from '../utils'
import BasicPage from "./BasicPage"
import '@ant-design/icons-react-native'

const ListItem = List.Item

const typeDate = [
  { label: '消息通知', value: '消息通知' },
  { label: '会议内容', value: '会议内容' },
  { label: '决策安排', value: '决策安排' },
  { label: '人员调动', value: '人员调动' },
  { label: '公司新闻', value: '公司新闻' },
]

@connect(({ loading }) => ({ addMessageLoading: loading.effects['message/addMessage'], })
)
class Send extends Component {
  static navigationOptions = {
    tabBarLabel: '发稿',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/send.png')}
      />
    ),
  }

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      txt: "",
      sender: "张三",
      type: null,
    }
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  sendMessage = () => {
    const { title, txt, sender, type } = this.state
    const { dispatch } = this.props
    const time = this.getDate()
    const newMessage = {
      txt,
      title,
      sender,
      time,
      type,
    }
    dispatch({
      type: "message/addMessage",
      payload: {
        newMessage
      }
    })
  }

  getDate = () => {
    const date = new Date
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const dateString = `${year}-${month}-${day} ${hour}:${minute}`
    return dateString
  }

  typeChange = value => {
    this.setState({ type: value })
  }

  render() {
    const { type } = this.state
    const { addMessageLoading } = this.props
    return (
      <BasicPage>
        <View style={{ paddingTop: 30, height:1000 }}>
          <ScrollView
            style={{ flex: 1 }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {
              addMessageLoading ? (
                <Loading />
              ) : (
                  <Provider>
                    <List renderHeader="详情">
                      <InputItem
                        clear
                      >
                        收信人
                </InputItem>
                      <Picker
                        data={typeDate}
                        cols={1}
                        value={[type]}
                        onChange={values => { const value = values[0]; this.typeChange(value) }}
                      >
                        <ListItem >
                          类型选择
                  </ListItem>
                      </Picker>
                      <InputItem
                        clear
                        onChange={value => this.setState({ title: value })}
                      >
                        标题
                </InputItem>

                      <TextareaItem
                        placeholder="正文"
                        clear
                        rows={10}
                        autoHeight
                        style={{ paddingVertical: 5 }}
                        onChange={value => this.setState({ txt: value })}
                      />
                      <ListItem>
                        <Button
                          onPress={() => {
                            this.sendMessage()
                          }}
                          type="primary"
                        >
                          提交
                  </Button>
                      </ListItem>
                    </List>
                  </Provider>
                )
            }
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

export default Send
