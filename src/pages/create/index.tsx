import React, { useState } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Input, Editor, Picker } from "@tarojs/components";
import classnames from "classnames";
import TopBg from "../../components/common/Topbg";
import "./index.less";

const Create = () => {
  const params = getCurrentInstance()?.router?.params;
  const [date, setDate] = useState<any>(params?.date);
  const [content, setContent] = useState<any>("");

  const handleDateChange = (e) => {
    setDate(e.detail.value);
  };

  const editorReady = (e) => {
    Taro.createSelectorQuery()
      .select("#editor")
      .context((res) => {
        setContent(res.context);
      })
      .exec();
  };

  const handleSubmit = () => {
    console.log(date, content);
  };

  return (
    <View className='createForm'>
      <TopBg />
      <View className='list'>
        <View className='item'>
          <View className='item-label'>
            <View className='item-icon' />
          </View>
          <View className={classnames("item-flex", "item-flex-picker")}>
            <Picker mode='date' onChange={handleDateChange}>
              <View className='picker'>{date}</View>
            </Picker>
          </View>
        </View>
        <View className='item'>
          <View className='item-flex'>
            <Editor
              className='editor'
              id='editor'
              placeholder='日程详情'
              onReady={editorReady}
            />
          </View>
        </View>
      </View>
      <View className='operation'>
        <View className='operation_delete'>删除</View>
        <View className='operation_confirm' onClick={handleSubmit}>
          保存
        </View>
      </View>
    </View>
  );
};

export default Create;
