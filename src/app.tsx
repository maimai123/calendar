import { Component, PropsWithChildren } from "react";
import { Provider } from "mobx-react";
import "taro-ui/dist/style/index.scss";

import counterStore from "./store/counter";
import memoStore from "./store/memo";
import "./app.scss";

const store = {
  counterStore,
  memoStore,
};

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
