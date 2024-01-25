import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
  },
  loaderContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    fontSize: 20,
    color: "white",
  },
  container: {
    marginTop: 50,
    alignItems: "center",
    flexGrow:1,
  },
  title: {
    fontWeight: "thin",
    fontSize: 20,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: "auto",
    color: "white",
  },
  weathercontainer: {
    flexDirection: "row",
  },
  weather: {
    fontSize: 35,
    marginRight: 10,
    color: "white",
  },
  temp: {
    fontSize: 70,
    color: "white",
  },
  icon: {
    width: 95,
    height: 55,
  },
  today: {
    fontSize: 15,
    color: "white",
    marginTop: 15,
    marginBottom: 40,
  },
  flatList: {
    width: "80%",
    marginLeft: 25,
  },
  itemInFlatlist: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    marginBottom: 25,
    borderRadius: 25,
    padding: 10,
  },
  date: {
    fontSize: 15,
    color: "white",
    marginBottom: 10,
  },
  item: {
    marginRight: 25,
    alignItems: "center",
    paddingBottom: 25,
  },
  hour: {
    fontSize: 12,
    color: "white",
    marginBottom: 5,
  },
  iconList: {
    width: 50,
    height: 50,
  },
  tempList: {
    fontSize: 14,
    color: "white",
  },
});

export default styles;
