import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import type { Summary } from "../../src/models/summary_wikipedia";
import getSummary from "../../src/view_models/summary_view_model";

export default function WikipediaScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<Summary | null>(null);

    const handleNextArticle = async () => {
        setIsLoading(true);
        try {
            const result = await getSummary();
            setSummary(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Wikipedia Random Articles.</Text>
                {summary ? (
                    <View style={styles.card}>
                        <Text style={styles.label}>{summary.titles.normalized}</Text>
                        <Text style={styles.text}>{summary.description}</Text>
                        <Text style={styles.extract}>{summary.extract}</Text>
                        <Text style={styles.meta}>Source: {summary.descriptionSource}</Text>
                        {summary.originalimage?.source ? (
                            <Image
                                source={{ uri: summary.originalimage.source }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text style={styles.meta}>No image available for this article.</Text>
                        )}
                    </View>
                ) : (
                    <Text style={styles.text}>Tap the button to load a random article.</Text>
                )}
            </View>
            <View style={styles.footerContainer}>
                <Button 
                onPress={handleNextArticle}
                title={isLoading ? "Loading..." : "Next random article"}
                disabled={isLoading}
                color={styles.button.backgroundColor}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center",
    },
    text: {
        color: "#fff",
        textAlign: "center",
    },
    label: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
    },
    extract: {
        color: "#d7d7d7",
        marginTop: 10,
        textAlign: "center",
    },
    meta: {
        color: "#9ea7b3",
        marginTop: 12,
        textAlign: "center",
        fontSize: 12,
    },
    card: {
        flex: 1,
        backgroundColor: "#1f2328",
        borderRadius: 16,
        padding: 16,
        gap: 8,
    },
    image: {
        flex: 1,
        borderRadius: 12,
        marginTop: 12,
    },
    footerContainer: {
        padding: 16,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    button: {
        backgroundColor: "#00ff00",
    },
});
