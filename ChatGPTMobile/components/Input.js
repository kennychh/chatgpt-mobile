import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Send, Refresh, Loading, Close } from "../icons";
import { getTheme } from "../theme";
export const Input = ({
  textInputRef,
  input,
  setInput,
  onSubmit,
  loading,
  isResultValid,
  editMessage,
  onLayout,
  height,
  error,
  result,
  setRegen,
  setError,
  setRetry,
  setEditMessage,
  theme,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const showSendIcon = isResultValid;
  const showRefreshIcon =
    (!isResultValid && !loading && result?.length > 0) || error;
  const showLoadingIcon = loading;
  const [editable, setEditable] = useState(!error);

  const showInputIcon = () => {
    if (showLoadingIcon) {
      return <Loading width="18px" height="18px" stroke="#fff" />;
    } else if (editMessage) {
      return <Send width="18px" height="18px" stroke="#fff" />;
    } else if (showRefreshIcon) {
      return <Refresh width="18px" height="18px" stroke="#fff" />;
    } else if (showSendIcon) {
      return <Send width="18px" height="18px" stroke="#fff" />;
    }
    return <Send width="18px" height="18px" stroke="#fff" />;
  };
  const getInputIconColor = () => {
    if (
      showLoadingIcon ||
      (result?.length == 0 && !isResultValid) ||
      (editMessage && !isResultValid)
    ) {
      return { backgroundColor: theme.input.button.disabled.backgroundColor };
    } else if (showRefreshIcon || showSendIcon) {
      return {};
    }
    return {};
  };

  const getInputDisabled = () => {
    if (editMessage) {
      return !isResultValid;
    } else if (showRefreshIcon && error) {
      return false;
    } else if (showLoadingIcon || error) {
      return true;
    } else if (showRefreshIcon || showSendIcon) {
      return false;
    } else if (!isResultValid) {
      return true;
    }
    return false;
  };

  const getInputOnPress = () => {
    if (editMessage) {
      onSubmit();
    } else if (showRefreshIcon && !result[0]?.isInput) {
      setRegen(true);
    } else if (showRefreshIcon) {
      setRetry({ ...result[0], isError: false });
    } else if (isResultValid) {
      onSubmit();
    }
    setError(false);
  };

  useEffect(() => {
    setEditable(!!editMessage || !error);
  }, [editMessage, error]);

  useEffect(() => {
    if (editable && !!editMessage) {
      textInputRef.current.focus();
    }
  }, [editable, editMessage]);

  return (
    <View>
      <View
        style={[
          styles.inputBottomBackground(theme),
          { height: height / 2, width: windowWidth - 16 },
        ]}
      />
      <View style={styles.container} onLayout={(event) => onLayout(event)}>
        {editMessage && (
          <View style={{ width: windowWidth, marginHorizontal: -16 }}>
            <View style={styles.divider(theme)} />
            <View
              style={{
                width: windowWidth,
                backgroundColor: theme.backgroundColor,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => {
                  setEditMessage(null);
                  setInput("");
                }}
              >
                <Close
                  width="18px"
                  height="18px"
                  stroke={theme.secondaryIconColor}
                />
              </TouchableOpacity>
              <Text style={styles.text(theme)}>Editing message</Text>
            </View>
          </View>
        )}
        <View style={{ overflow: "hidden", borderRadius: 24 }}>
          <BlurView style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.inputContainer(theme)}>
              <View style={{ flex: 1, paddingTop: 12, paddingBottom: 12 }}>
                <TextInput
                  ref={textInputRef}
                  keyboardAppearance={
                    theme === getTheme("dark") ? "dark" : "light"
                  }
                  placeholder={
                    editable ? "Enter prompt" : "Regenerate response"
                  }
                  placeholderTextColor={theme.input.placeholderFontColor}
                  style={styles.input(theme)}
                  multiline={true}
                  value={input}
                  editable={editable}
                  onChangeText={(s) => setInput(s)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  getInputOnPress();
                  setEditMessage(null);
                }}
                style={[styles.button, getInputIconColor()]}
                disabled={getInputDisabled()}
              >
                {showInputIcon()}
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: (theme) => ({
    height: 1,
    marginHorizontal: -16,
    backgroundColor: theme.divider.color,
  }),
  inputBottomBackground: (theme) => ({
    position: "absolute",
    backgroundColor: theme.backgroundColor,
    bottom: 0,
  }),
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    position: "absolute",
    width: "100%",
    bottom: 0,
    overflow: "hidden",
  },
  inputContainer: (theme) => ({
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: theme.input.backgroundColor,
    flex: 1,
    maxHeight: 120,
    borderRadius: 24,
  }),
  button: {
    backgroundColor: "#10a37f",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    marginVertical: 4,
    marginRight: 4,
  },
  closeIcon: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  text: (theme) => ({
    fontSize: 14,
    color: theme.input.placeholderFontColor,
    marginLeft: 8,
  }),
  input: (theme) => ({
    fontSize: 16,
    marginLeft: 16,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 8,
    color: theme.input.fontColor,
  }),
});
