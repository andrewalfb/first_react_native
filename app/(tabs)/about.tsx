import Shapes, { Shape } from "@/components/shapes";

import { StyleSheet, View } from "react-native";

export default function AboutScreen() {
  return (
    // <View style={styles.container}>
    //   {/* <Text style={styles.text}>About Screen</Text> */}
    //   <View
    //     style={{
    //       flex: 1,
    //       flexGrow: 1,
    //     }}
    //   >
    //     <Shapes shape={Shape.Circle} color={"green"} />
    //   </View>
    //   <View
    //     style={{
    //       flex: 1,
    //     }}
    //   >
    //     <Shapes shape={Shape.Triangle} color={"yellow"} />
    //   </View>
    //   <View
    //     style={{
    //       flex: 1,
    //     }}
    //   >
    //     <Shapes shape={Shape.Square} color={"blue"} />
    //   </View>

    //   <View
    //     style={{
    //       flex: 1,
    //     }}
    //   >
    //     <Shapes shape={Shape.Parallelogram} color={"red"} />
    //   </View>
    // </View>
    <View style={styles.container}>
      <View
        style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", padding: 8 }}
      >
        {[
          { s: Shape.Circle, c: "green" },
          { s: Shape.Triangle, c: "yellow" },
          { s: Shape.Square, c: "blue" },
          { s: Shape.Parallelogram, c: "red" },
        ].map((it, i) => (
          <View key={i} style={{ width: "50%", padding: 8 }}>
            <View style={{ aspectRatio: 1, flex: 1 }}>
              <Shapes shape={it.s} color={it.c} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
