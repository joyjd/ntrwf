import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

class AppTeaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
      ],
    };
  }
  render() {
    return (
      <View style={styles.teaserWrapper}>
        <SliderBox images={this.state.images} />
      </View>
    );
  }
}

export default AppTeaser;

const styles = StyleSheet.create({
  teaserWrapper: {
    height: 200,
    marginVertical: 20,
  },
});
