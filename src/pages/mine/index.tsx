import Taro from "@tarojs/taro";
import { Component } from "react";
import { View } from "@tarojs/components";
import TopBg from "../../components/common/Topbg";
import Calendar from "../../components/calendar";

import type CustomTabBar from "../../custom-tab-bar";
import "./index.scss";

export default class Index extends Component {
  pageCtx = Taro.getCurrentInstance().page;

  componentDidShow() {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx);
    tabbar?.setSelected(1);
  }

  render() {
    return (
      <View className='mine'>
        <TopBg />
        <Calendar />
      </View>
    );
  }
}
