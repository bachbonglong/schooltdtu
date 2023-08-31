import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from "../components";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = [
    {
      name: "Home",
      icon: "home",
      "icon-family": "font-awesome-5",
      "icon-color": theme.COLORS.PRIMARY,
    },
    {
      name: "Profile",
      icon: "user",
      "icon-family": "font-awesome-5",
      "icon-color": theme.COLORS.ERROR,
    },
    {
      name: "Notifications",
      icon: "bell",
      "icon-family": "font-awesome",
      "icon-color": theme.COLORS.PRIMARY,
    },
    {
      name: "Settings",
      icon: "bars",
      "icon-family": "font-awesome-5",
      "icon-color": theme.COLORS.INFO,
    },
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image
          style={{ width: 100, height: 50 }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png",
          }}
        />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item.name}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
                icon={item.icon}
                iconFamily={item["icon-family"]}
                iconColor={item["icon-color"]}
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>
              DOCUMENTATION
            </Text>
          </Block>
          <DrawerCustomItem
            title="Getting Started"
            navigation={navigation}
            icon="hands-helping"
            iconFamily="font-awesome-5"
            iconColor="rgba(0,0,0,0.5)"
          />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;
