import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    theme?: 'primary';
    onPress?: () => void;
}

export default function Button({ label, theme, onPress }: Props) {
    if (theme === 'primary') {
        return (
            <View style={[
                styles.container, 
                { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }]}>
                <Pressable
                    style={[styles.button, { backgroundColor: '#fff' }]}
                    onPress={onPress}>
                        <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.icon} />
                        <Text style={[styles.label, { color: '#25292e' }]}>{label}</Text>
                    </Pressable>
            </View>
        );
    }
    return (
        <View style={styles.container} >
            <Pressable 
                style={ styles.button}
                onPress={ onPress}>
                    <Text style={ styles.label }>{ label }</Text>
             </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
    },
    button: {
        flexDirection: "row",
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: "#fff",
        fontSize: 16,
    },
    icon: {
        paddingRight: 8,
    }
})