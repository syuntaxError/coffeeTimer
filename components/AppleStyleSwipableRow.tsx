import React from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const AppleStyleSwipeableRow = ({ children, onDelete }) => {
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.rightAction} onPress={onDelete}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          削除
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    flex: 1,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
});

export default AppleStyleSwipeableRow;
