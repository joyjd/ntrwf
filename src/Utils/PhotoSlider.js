import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { SliderBox } from "react-native-image-slider-box";

export default class Photoslider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 320,
      images: this.props.photo,
    };
  }

  render() {
    return (
      <View
        onLayout={(e) => {
          this.setState({
            width: e.nativeEvent.layout.width,
          });
        }}
      >
        <SliderBox resizeMode={"stretch"} ImageComponentStyle={{ ...this.props.customStyle }} autoplay={false} circleLoop={false} dotColor='#DD2476' inactiveDotColor='#90A4AE' parentWidth={this.state.width} images={this.state.images} onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
