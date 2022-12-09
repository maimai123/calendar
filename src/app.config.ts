export default defineAppConfig({
  pages: ["pages/index/index", "pages/list/index", "pages/mine/index"],
  window: {
    backgroundColor: "#fff",
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    color: "#fff",
    selectedColor: "#000000",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        selectedIconPath: "images/faxian_active.png",
        iconPath: "images/faxian.png",
        text: "列表",
      },
      // {
      //   pagePath: "pages/index/index",
      //   selectedIconPath: "images/faxian_active.png",
      //   iconPath: "images/faxian.png",
      //   text: "新建",
      // },
      {
        pagePath: "pages/mine/index",
        selectedIconPath: "images/home_active.png",
        iconPath: "images/home.png",
        text: "我的",
      },
    ],
  },
});
