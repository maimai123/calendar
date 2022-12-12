import Taro from "@tarojs/taro";
import { Component } from "react";
import { View } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import TopBg from "../../components/common/Topbg";
import Calendar from "../../components/calendar";
import { PageStateProps } from "../../constants/types";
import type CustomTabBar from "../../custom-tab-bar";
import "./index.scss";

@inject("store")
@observer
export default class Index extends Component<PageStateProps, {}> {
  pageCtx = Taro.getCurrentInstance().page;

  componentDidShow() {
    const tabbar = Taro.getTabBar<CustomTabBar>(this.pageCtx);
    tabbar?.setSelected(1);
    console.log(22);
  }

  render() {
    const {
      store: { memoStore },
    } = this.props;

    return (
      <View className='mine'>
        <TopBg />
        <Calendar memoList={memoStore.list} />
      </View>
    );
  }
}
