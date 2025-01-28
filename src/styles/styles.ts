import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#64748b",
        marginBottom: 30,
        padding: 14,
        borderRadius: 4,
    },
    text: {
        fontWeight: "500",
        color: "#FFF"
    },
    buttons: {
        position: "absolute",
        bottom: -10,
        flexDirection: "row",
        right: 0,
        zIndex: 99,
        gap: 8,
    },
    buttonDelete: {
        backgroundColor: "#ef4444",
        padding: 6,
        borderRadius: 99,
    },
    buttonComplete: {
        backgroundColor: "#22c55e",
        padding: 6,
        borderRadius: 99,
    },
    buttonEdit: {
        backgroundColor: "#F5B400",
        padding: 6,
        borderRadius: 99,
    },
    pressButton: {
        backgroundColor: "#F28B81"
    }
})