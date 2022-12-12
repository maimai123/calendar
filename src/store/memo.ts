import { observable } from 'mobx'

const memoStore = observable({
  list: {
    "2022-12-07": "这里记录了一些内容",
    "2022-12-27": "这里记录了一些内容",
    "2022-12-16": "这里记录了一些内容",
  },
  add(type: string, content: string) {
    this.list[type] = content
  },
  delete(type: string) {
    delete this.list[type]
  },
})

export default memoStore
