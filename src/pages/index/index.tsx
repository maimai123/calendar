import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { list } from "../../constants/index";

import type CustomTabBar from "../../custom-tab-bar";
import "./index.scss";

export default class Index extends Component {
  pageCtx = Taro.getCurrentInstance().page;

  componentDidShow() {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx);
    tabbar?.setSelected(0);
  }

  render() {
    return (
      <View className='list'>
        {list.map((item, i) => (
          <View className='list-item' key={i}>
            <Text className='list-item__title'>{item.title}</Text>
            <Text className='list-item__count'>{item.count}</Text>
          </View>
        ))}
      </View>
    );
  }
}
