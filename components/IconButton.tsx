import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
    return (
        <Pressable style={buttonStyles.icon} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color="#fff" />
            <Text style={buttonStyles.label}>{label}</Text>
        </Pressable>
    );
}

const buttonStyles = StyleSheet.create({
    icon: {
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: "#fff",
        marginTop: 12,
    },
});