import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedMultistep from "./Lib";

import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Four from "./Four";
import Five from "./Five";
import Six from "./Six";


const allSteps = [
  { name: "First", component: First },
  { name: "Second", component: Second },
  { name: "Third", component: Third },
  {name : "Four", component: Four},
  { name: "Five", component: Five },
  { name: "Six", component: Six },

];

export default class tambah extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onNext = () => {
    console.log("Next");
  };
  onBack = () => {
    console.log("Back");
  };

  finish = state => {
    console.log("TCL: App -> state", state);
  };

  render() {
    return (
        <View style={styles.lowerContainer}>
        <AnimatedMultistep
          steps={allSteps}
          onFinish={this.finish}
          animate={true}
          onBack={this.onBack}
          onNext={this.onNext}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loginText: {
    fontSize: 32,
    color: "#fff"
  },
  lowerContainer: {
    flex: 2
  }
});