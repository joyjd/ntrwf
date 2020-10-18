import React from "react";
import { StyleSheet, View, Image, Dimensions, ActivityIndicator } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { getOnceSnapshot } from "./../../Firebase/FirebaseActions";

class AppTeaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isReady: false,
    };
  }

  componentDidMount() {
    getOnceSnapshot("AppTeaser/TeaserPics").then((snapshot) => {
      let pt = snapshot.val();
      let newArr = [];
      Object.keys(pt).map((key) => {
        newArr.push(pt[key]);
      });

      this.setState({
        images: newArr,
        isReady: true,
      });
    });
  }

  render() {
    return this.state.isReady ? (
      <View style={styles.teaserWrapper}>
        <SliderBox autoplay={true} circleLoop={true} dotColor='#DD2476' inactiveDotColor='#90A4AE' images={this.state.images} />
      </View>
    ) : (
      <ActivityIndicator size='large' color='#831A2B' />
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
