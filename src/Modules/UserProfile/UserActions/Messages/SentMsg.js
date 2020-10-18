import React from "react";
import { StyleSheet, Dimensions, View, FlatList } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";
import DataContext from "./../../../../Context/DataContext";
import MsgCard from "./MsgCard";

class SentMsg extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <FlatList
          ListFooterComponent={<View style={{ marginVertical: 40 }}></View>}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(index) => index.MessageId}
          data={this.context.sentMessages}
          renderItem={({ item, index }) => {
            return <MsgCard index={index} item={item} type='sent' />;
          }}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({});
export default SentMsg;
