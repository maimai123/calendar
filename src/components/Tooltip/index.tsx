import { View } from "@tarojs/components";
import classnames from "classnames";
import { weekListCN, wordsList } from "../../constants";
import "./index.scss";

interface IProps {
  lunarDate: {
    date: string;
    yearTips: string;
    chineseZodiac: string;
    lunarCalendar: string;
    weekOfYear: string;
    weekDay: number;
    constellation: string;
    suit: string;
    avoid: string;
  };
}

const TopBg = (props: IProps) => {
  const { lunarDate } = props;
  const randomIndex = parseInt(`${Math.random() * 18}`, 10);

  return (
    <View>
      {(lunarDate?.yearTips && (
        <View className='lunarDate'>
          <View className='lunar-title'>
            {lunarDate?.date} {lunarDate?.yearTips}（{lunarDate?.chineseZodiac}
            ）年 · {lunarDate?.lunarCalendar}
          </View>
          <View className='lunar-title'>
            第 {lunarDate?.weekOfYear} 周 星期
            {weekListCN.get(lunarDate?.weekDay)} {lunarDate?.constellation}
          </View>
          <View className={classnames("lunar-tags", "lunar-tags-suit")}>
            <View className='lunar-tags-label'>宜</View>
            <View className='lunar-tags-list'>
              {lunarDate?.suit.split(/[.]/).map((item) => (
                <View className='tag'>{item}</View>
              ))}
            </View>
          </View>
          <View className={classnames("lunar-tags", "lunar-tags-avoid")}>
            <View className='lunar-tags-label'>宜</View>
            <View className='lunar-tags-list'>
              {lunarDate?.avoid.split(/[.]/).map((item) => (
                <View className='tag'>{item}</View>
              ))}
            </View>
          </View>
        </View>
      )) || <View className='words'>{wordsList[randomIndex]}</View>}
    </View>
  );
};

export default TopBg;
