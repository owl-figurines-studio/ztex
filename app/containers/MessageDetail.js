import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { List, InputItem, TextareaItem } from '@ant-design/react-native'
import BasicPage from "./BasicPage"
import { NavigationActions } from '../utils'

const ListItem = List.Item

const mapStateToProps = ({ message }) => {
  const { currentMessage } = message
  return {
    currentMessage,
  }
}

@connect(mapStateToProps)
class MessageDetail extends Component {
  static navigationOptions = {
    title: '详情',
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }

  getTxt = content => {
    let txt = ""
    content.forEach(item => {
      const { type, value } = item
      if (type === 'txt') {
        txt += value
      }
    })
    return txt
  }

  render() {
    const { currentMessage } = this.props
    const { content, time, sender, title, type } = currentMessage
    const txt = this.getTxt(content)
    return (

      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BasicPage  >
          <List renderHeader="详情">
            <InputItem
              value={title}
              editable={false}
            >
              标题
          </InputItem>

            <InputItem
              value={sender}
              editable={false}
            >
              发信人
          </InputItem>

            <InputItem
              value={time}
              editable={false}
            >
              时间
          </InputItem>
            <InputItem
              value={type}
              editable={false}
            >
              类型
          </InputItem>
            <ListItem>正文：</ListItem>
            <TextareaItem
              rows={4}
              value={txt}
              autoHeight
              style={{ paddingVertical: 5 }}
              editable={false}
            />
          </List>
        </BasicPage>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MessageDetail
