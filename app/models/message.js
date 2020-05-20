
const initState = {
  messages: [
    {
      content: [{ type:"txt", value:"在创作上，这部小说场面调度正确，逼真地反映了80年代美国的社会氛围。然而，作者显然没有“预先设计”的程序，但是他运用了电脑操作的一般规律，故而小说的结构和情节具有电脑程序的可创性。" }],
      time: "2019-08-21 13:23",
      sender: "路人甲",
      title: "小事情",
      type: "会议内容",
    },
    {
      content: [{ type:"txt", value:"小说情节复杂跳跃，模拟人们进入电脑创意空间后的神奇感觉。小说容纳了多重而又强烈的意象。这些意象超越了科幻的界限，进入大众文化之中，进入电脑文明之中，进入了后现代跨国资本主义之中，构成一个离奇、疯狂、似非而是的未来世界。" }],
      time: "2019-09-11 06:11",
      sender: "路人乙",
      title: "多大事",
      type: "人员调动",
    },
    {
      content: [{ type:"txt", value:"这些意象的批判性隐喻，使未来世界错综复杂，耐人寻味。这部小说在创作上的突破，开阔了科幻审视社会的视野，给科幻小说带了新的活力。" }],
      time: "2020-01-01 10:57",
      sender: "路人丙",
      title: "没有事",
      type: "消息通知",
    },
    {
      content: [
        { type:"txt", value:"在创作上，这部小说场面调度正确，逼真地反映了80年代美国的社会氛围。然而，作者显然没有“预先设计”的程序，但是他运用了电脑操作的一般规律，故而小说的结构和情节具有电脑程序的可创性。" },
        { type:"image", value:"../images/tim.jpg" },
        { type:"txt", value:"小说情节复杂跳跃，模拟人们进入电脑创意空间后的神奇感觉。小说容纳了多重而又强烈的意象。这些意象超越了科幻的界限，进入大众文化之中，进入电脑文明之中，进入了后现代跨国资本主义之中，构成一个离奇、疯狂、似非而是的未来世界。" },
        { type:"txt", value:"这些意象的批判性隐喻，使未来世界错综复杂，耐人寻味。这部小说在创作上的突破，开阔了科幻审视社会的视野，给科幻小说带了新的活力。" },
      ],
      time: "2020-01-03 11:40",
      sender: "路人丁",
      title: "真有此事",
      type: "消息通知",
    },
  ],
  currentMessage: {},
}

export default {
  namespace: 'message',
  state: initState,
  reducers: {
    updateMessages(state, { payload: { messages } }) {
      return { ...state, messages }
    },
    updateCurrentMessage(state, { payload: { currentMessage } }) {
      return { ...state, currentMessage }
    },
  },
  effects: {
    *addMessage({ payload }, { call, put, select }) {
      const { newMessage } = payload
      yield call(delay, 1000)
      const { messages: prevMessages } = yield select(state => state.message)
      const nextMessages = [...prevMessages, newMessage]
      yield put({ type: 'updateMessages', payload: { messages: nextMessages } })
    },
    *deleteMessage({ payload }, { put, select }) {
      const { key } = payload
      const { messages: prevMessages } = yield select(state => state.message)
      const nextMessages = prevMessages.filter((item, index) => index !== key)
      yield put({ type: 'updateMessages', payload: { messages: nextMessages } })
    },
  },
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}