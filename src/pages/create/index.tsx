import React, { useState } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Textarea, Picker } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { AtToast } from "taro-ui";
import classnames from "classnames";
import { PageStateProps } from "../../constants/types";
import TopBg from "../../components/common/Topbg";
import "./index.scss";

const Create: React.FC = (props: PageStateProps) => {
  const {
    store: { memoStore },
  } = props;
  const params = getCurrentInstance()?.router?.params;
  const [date, setDate] = useState<any>(params?.date);
  const [content, setContent] = useState<any>("");
  const [visible, setVisible] = useState(false);

  const handleDateChange = (e) => {
    setDate(e.detail.value);
  };

  const handleSubmit = () => {
    if (!content) {
      setVisible(true);
    } else {
      memoStore.add(date, content);
      Taro.switchTab({
        url: `/pages/mine/index`,
      });
    }
  };

  const handleDel = () => {
    memoStore.delete(date);
    Taro.switchTab({
      url: `/pages/mine/index`,
    });
  };

  return (
    <View className='createForm'>
      <TopBg />
      <AtToast isOpened={visible} text='请输入日程详情'></AtToast>
      <View className='list'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-icon' />
          </View>
          <View className={classnames("item-flex", "item-flex-picker")}>
            <Picker mode='date' value={date} onChange={handleDateChange}>
              <View className='picker'>{date}</View>
            </Picker>
          </View>
        </View>
        <View className='item'>
          <View className='item-flex'>
            <Textarea
              className='editor'
              id='editor'
              placeholder='日程详情'
              autoFocus
              onInput={(e) => setContent(e.detail.value)}
            />
          </View>
        </View>
      </View>
      <View className='operation'>
        <View className='operation_delete' onClick={handleDel}>
          删除
        </View>
        <View className='operation_confirm' onClick={handleSubmit}>
          保存
        </View>
      </View>
    </View>
  );
};

export default inject("store")(observer(Create));
