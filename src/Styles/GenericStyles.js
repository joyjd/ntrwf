import { StyleSheet } from "react-native";

const textUtil = StyleSheet.create({
  medium: {
    fontFamily: "Baloo2-Medium",
  },
  semiBold: {
    fontFamily: "Baloo2-SemiBold",
  },
  bold: {
    fontFamily: "Baloo2-Bold",
  },
  fontBold: {
    fontWeight: "bold",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  passiveText: {
    color: "#3e090991",
  },
  passiveTextX: {
    color: "#3e090959",
  },
});

const viewUtil = StyleSheet.create({
  disableView: {
    opacity: 0.2,
  },
  viewPageWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ff929226",
  },
  textWrapperVw: {
    flexGrow: 1,
    flex: 1,
  },
  circularVw: {
    borderRadius: 30,
  },
  cardVw: {
    borderRadius: 20,
  },
  viewRow: {
    display: "flex",
    flexDirection: "row",
  },
  viewCol: {
    display: "flex",
    flexDirection: "column",
  },
  subHeader: {
    height: 60,
    width: "100%",
  },

  header: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ece8e8",
  },
  activeBar: {
    borderBottomColor: "#880E4F",
    borderBottomWidth: 4,
    backgroundColor: "#ffffff",
  },
});

const cssUtil = StyleSheet.create({
  shadowX: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 6,
  },
  shadowXX: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  iconShadow: {
    shadowOpacity: 2,
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 },
  },
});

export { viewUtil, cssUtil, textUtil };
