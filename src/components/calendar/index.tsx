import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import classnames from "classnames";
import moment from "moment";
import { PageStateProps } from "../../constants/types";
import LunarDate from "../../components/LunarDate";
import {
  weekList,
  monthLists,
  APP_ID,
  APP_SECRET,
} from "../../constants/index";
import "./index.scss";

const PageIndex: React.FC = (props: PageStateProps) => {
  const {
    store: { memoStore },
  } = props;
  const [monthList, setMonthList] = useState<any[]>([]);
  const [current, setCurrent] = useState(moment().format("YYYY-MM")); // 当前月份
  const [choose, setChoose] = useState(moment().format("YYYY-MM-DD")); // 当前选择日期
  const [expand, setExpand] = useState(true); // 是否展开
  const currentYear = moment(current).year();
  const currentMonth = moment(current).month() + 1;
  const [list, setList] = useState<string[]>([]); // 点过的月份
  const [lunarDate, setLunarDate] = useState<any[]>([]);

  useEffect(() => {
    getMonthList(current);
  }, [current, expand]);

  useEffect(() => {
    getLunarDate(current);
  }, [current]);

  const getLunarDate = async (cur: string) => {
    // const formatDate = moment(date).format("YYYYMM");
    // https://www.mxnzp.com/api/holiday/list/month/${formatDate}/festival // 当前月份节日
    // https://www.mxnzp.com/api/holiday/single/${moment(choose).format("YYYYMMDD" )} // 当天农历
    if (list.includes(cur)) return;
    Taro.request({
      url: `https://www.mxnzp.com/api/holiday/list/month/${moment(cur).format(
        "YYYYMM"
      )}`,
      data: {
        app_id: APP_ID,
        app_secret: APP_SECRET,
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success: function (res) {
        if (!res?.data?.data) return;
        setList(list.concat(cur));
        setLunarDate(lunarDate.concat(res.data?.data || []));
      },
    });
  };

  const getMonthList = (date: string) => {
    const dateList: any[] = [];
    const thisIndex = moment(`${date}-01`).day();
    const first = !expand
      ? moment(choose).startOf("week")
      : moment(`${date}-01`).add(-thisIndex, "d").format("YYYY-MM-DD HH:mm:ss");
    const len = choose && !expand ? 7 : 35;
    for (let i = 0; i < len; i++) {
      let type;
      if (
        moment(first).add(i, "d").format("MM") !== moment(date).format("MM")
      ) {
        type = 3; // 不是本月
      } else if (
        moment(first).add(i, "d").format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
      ) {
        type = 2; // 当天
      } else if ([0, 6].includes(moment(first).add(i, "d").day())) {
        type = 1; // 周末
      } else {
        type = 0;
      }
      dateList.push({
        day: moment(first).add(i, "d").format("YYYY-MM-DD"),
        type,
      });
    }
    setMonthList(dateList);
  };

  console.log(memoStore.list);

  return (
    <View className='box'>
      <View className={classnames("calendar", expand && "calendar-clock")}>
        <View className='calendar-head'>
          <Text
            className='prev'
            onClick={() =>
              setCurrent(moment(current).add(-1, "months").format("YYYY-MM"))
            }
          />
          <View>
            <View className='h5'>{monthLists.get(currentMonth)}</View>
            <Text>{currentYear}</Text>
          </View>
          <Text
            className='next'
            onClick={() =>
              setCurrent(moment(current).add(+1, "months").format("YYYY-MM"))
            }
          />
        </View>
        <View className='title'>
          {weekList.map((item) => (
            <View key={item}>{item}</View>
          ))}
        </View>
        <View className='date'>
          {monthList.map((item, i) => (
            <View
              key={i}
              onClick={() => {
                setChoose(item.day);
                if (item.day != choose) {
                  setExpand(expand);
                } else {
                  setExpand(!expand);
                }
              }}
              className={classnames(
                "date-item",
                item.type === 1 && "weekend",
                item.type === 2 && !choose && "today",
                choose === item.day && "choose",
                item.type === 3 && "otherMonth"
              )}
            >
              {memoStore.list[item.day] && <Text className='date-item-doc' />}
              <View>{moment(item.day).format("DD")}</View>
            </View>
          ))}
        </View>
      </View>
      <LunarDate
        lunarDate={lunarDate.filter((item) => item.date === choose)[0]}
      />
      <View
        className='addBtn'
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/create/index?date=${choose}`,
          })
        }
      />
    </View>
  );
};

export default inject("store")(observer(PageIndex));
