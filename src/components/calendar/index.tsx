import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import moment from "moment";
import classnames from "classnames";
import "./index.less";

const PageIndex: React.FC = () => {
  const [monthList, setMonthList] = useState<any[]>([]);
  const [current, setCurrent] = useState(moment().format("YYYY-MM")); // 当前月份
  const [choose, setChoose] = useState(); // 当前选择日期
  const [expand, setExpand] = useState(true); // 是否展开
  const currentYear = moment(current).year();
  const currentMonth = moment(current).month() + 1;
  const weekList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLists = new Map([
    [1, "Jan"],
    [2, "Feb"],
    [3, "Mar"],
    [4, "Apr"],
    [5, "May"],
    [6, "Jun"],
    [7, "JView"],
    [8, "Aug"],
    [9, "Sep"],
    [10, "Oct"],
    [11, "Nov"],
    [12, "Dec"],
  ]);
  const [festival, setFestival] = useState([]); // 前后7天节日列表

  const infoList = {
    "2022-12-07": "这里记录了一些内容",
    "2022-12-27": "这里记录了一些内容",
    "2022-12-16": "这里记录了一些内容",
  };

  useEffect(() => {
    getMonthList(current);
  }, [current, expand]);

  useEffect(() => {
    getHoliday(current);
  }, [current]);

  const getHoliday = async (date: string) => {
    // const formatDate = moment(date).format("YYYYMM");
    // https://www.mxnzp.com/api/holiday/list/month/${formatDate}/festival // 当前月份节日
    Taro.request({
      url: `https://www.mxnzp.com/api/holiday/recent/list`, // 前后7天节日
      data: {
        app_id: "rspnvejoskb9njip",
        app_secret: "UHVyV1pUUUl2bXp1WitnTFc1cEM5QT09",
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success: function (res) {
        setFestival(res.data?.data || []);
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
      } else if ([0, 6].includes(moment(first).add(i, "d").day())) {
        type = 1; // 周末
      } else if (
        moment(first).add(i, "d").format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
      ) {
        type = 2; // 当天
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

  return (
    <View className='box'>
      <View className='calendar'>
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
                  setExpand(false);
                } else if (item.day === choose && !expand) {
                  setExpand(true);
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
              {infoList[item.day] && <Text className='date-item-doc' />}
              <View>{moment(item.day).format("DD")}</View>
            </View>
          ))}
        </View>
        {!expand ? (
          <View className='wrapper'>
            <Image src={require(`../../images/banner_01.png`)} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default PageIndex;
