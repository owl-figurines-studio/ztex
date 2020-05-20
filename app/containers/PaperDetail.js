import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { List, WhiteSpace, WingBlank, Flex } from '@ant-design/react-native'
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
class PaperDetail extends Component {
  static navigationOptions = {
    title: '文章详情',
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }

  render() {
    const { currentMessage } = this.props
    const { content, time, sender, title, type } = currentMessage
    return (
      <BasicPage  >
        <View style={{ height: 1000 }}>
          <ScrollView
            style={{ flex: 1 }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <WingBlank size="md" >
              <WhiteSpace size="md" />
              <Text style={{ fontFamily: "STHeiti", fontSize: 25, color: "black" }}>{title}</Text>
              <WhiteSpace size="sm" />
              <Text style={{ color: "grey" }}>{`${sender}  ${type}  ${time}`}</Text>
              <WhiteSpace size="lg" />
              <View style={{ backgroundColor: "white", paddingLeft: 5, paddingRight: 5, paddingTop: 10, paddingBottom: 10 }}>
                {
                  content.map((item, index) => {
                    const { type: ItemType, value } = item
                    if (ItemType === "image") {
                      return (
                        <Flex direction="column"
                          key={`${ItemType}${index}`}
                        >
                          <Image
                          style={{width:200, height:112}}
                          source={require("../images/tim.jpg")}
                          />
                        </Flex>
                      )
                    }
                    return (
                      <Text
                        key={`${ItemType}${index}`}
                        style={{ color: "black", fontSize: 16, backgroundColor: "white", }}
                      >
                        {value}
                      </Text>
                    )
                  })
                }
              </View>
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
})

export default PaperDetail
