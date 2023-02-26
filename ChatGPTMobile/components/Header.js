import { StyleSheet, Text, View, Image, Keyboard } from "react-native";
import { More, Menu } from "../icons";
import { HeaderButton } from "./HeaderButton";
export const Header = ({ onOpen, modalizeRef, navigation, headerTitle }) => {
  const onPress = () => {
    Keyboard.dismiss();
    onOpen(modalizeRef);
  };
  return (
    <View style={styles.bar}>
      <View style={styles.barIcon}>
        <HeaderButton icon={<Menu />} onPress={() => navigation.openDrawer()} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/chat-gpt-logo.jpg")}
          style={styles.icon}
        />
        <Text style={styles.barText}>{headerTitle}</Text>
      </View>
      <View style={styles.barIcon}>
        <HeaderButton icon={<More />} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barIcon: {
    width: 24,
    height: 24,
  },
  barText: {
    fontSize: 12,
    marginVertical: 8,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: "50%",
  },
  bar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#F6F6F6",
    borderBottomWidth: 1,
    backgroundColor: "white",
    alignContent: "space-between",
    paddingHorizontal: 24,
    zIndex: 1,
  },
});
