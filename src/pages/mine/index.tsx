import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Calendar from "../../components/calendar";

import type CustomTabBar from "../../custom-tab-bar";
import "./index.less";

export default class Index extends Component {
  pageCtx = Taro.getCurrentInstance().page;

  componentDidShow() {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx);
    tabbar?.setSelected(1);
  }

  render() {
    return (
      <View className='mine'>
        <Calendar />
        <Text>我的！</Text>
      </View>
    );
  }
}
