import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import moment from "moment";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  setMonthLists,
  setCurrentMonths,
  setCurrentDates,
} from "../../store/actions";
import { weekList, monthLists } from "../../constants/index";
import "./index.less";

const PageIndex: React.FC = (props: any) => {
  const {
    monthList,
    setMonthList,
    currentMonth,
    setCurrentMonth,
    currentDate,
    setCurrentDate,
  } = props;
  const [expand, setExpand] = useState(true); // 是否展开
  const currentYear = moment(currentMonth).year();
  // const currentMonth = moment(current).month() + 1;

  const [festival, setFestival] = useState([]); // 前后7天节日列表

  const infoList = {
    "2022-12-07": "这里记录了一些内容",
    "2022-12-27": "这里记录了一些内容",
    "2022-12-16": "这里记录了一些内容",
  };

  useEffect(() => {
    getMonthList(currentMonth);
  }, [currentMonth, expand]);

  useEffect(() => {
    getHoliday(currentMonth);
  }, [currentMonth]);

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
      ? moment(currentDate).startOf("week")
      : moment(`${date}-01`).add(-thisIndex, "d").format("YYYY-MM-DD HH:mm:ss");
    const len = currentDate && !expand ? 7 : 35;
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
              setCurrentMonth(
                moment(currentMonth).add(-1, "months").format("YYYY-MM")
              )
            }
          />
          <View>
            <View className='h5'>{monthLists.get(currentMonth)}</View>
            <Text>{currentYear}</Text>
          </View>
          <Text
            className='next'
            onClick={() =>
              setCurrentMonth(
                moment(currentMonth).add(+1, "months").format("YYYY-MM")
              )
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
                setCurrentDate(item.day);
                if (item.day != currentDate) {
                  setExpand(false);
                } else if (item.day === currentDate && !expand) {
                  setExpand(true);
                }
              }}
              className={classnames(
                "date-item",
                item.type === 1 && "weekend",
                item.type === 2 && !currentDate && "today",
                currentDate === item.day && "choose",
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

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = {
  setMonthList: setMonthLists,
  setCurrentMonth: setCurrentMonths,
  setCurrentDate: setCurrentDates,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageIndex);
