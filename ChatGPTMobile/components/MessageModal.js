import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Copy, Edit } from "../icons";
import { Modalize } from "react-native-modalize";
export const MessageModal = ({ message, modalizeRef, onClose, setMessage }) => {
  const isInput = message?.isInput;
  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modalStyle}
      handleStyle={styles.handleStyle}
      handlePosition={"inside"}
      childrenStyle={styles.childrenStyle}
      adjustToContentHeight={true}
      onClose={() => setMessage(null)}
    >
      <View style={[styles.modalOptionsContainer, { marginBottom: 52 }]}>
        <TouchableOpacity
          onPress={() => {
            onClose(modalizeRef);
            setMessage(null);
          }}
        >
          <View style={styles.modalOption}>
            <Copy />
            <Text style={styles.modalOptionText}>Copy</Text>
          </View>
        </TouchableOpacity>
        {isInput && (
          <View>
            <View style={styles.modalOptionDivider} />
            <TouchableOpacity
              onPress={() => {
                onClose(modalizeRef);
                setMessage(null);
              }}
            >
              <View style={styles.modalOption}>
                <Edit />
                <Text style={styles.modalOptionText}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  childrenStyle: {},
  handleStyle: {
    width: 40,
    height: 4,
    backgroundColor: "#D9D9D9",
  },
  modalStyle: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalOptionText: {
    paddingLeft: 16,
    fontSize: 16,
    alignSelf: "center",
  },
  modalOptionDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#DBDBDB",
  },
  modalOption: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionsContainer: {
    marginTop: 40,
    backgroundColor: "#EFEFEF",
    width: "100%",
    borderRadius: 16,
  },
});