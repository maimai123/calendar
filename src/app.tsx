import React, { Component, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import "./app.less";
import store from "./store";

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
