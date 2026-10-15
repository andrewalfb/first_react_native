// import { ColorValue, StyleSheet, View } from "react-native";
// import Svg, { Polygon } from 'react-native-svg';

// type Props = {
//   shape: Shape;
//   color?: ColorValue;
//   size?: number;
// };

// export enum Shape {
//     Triangle = 'Triangle',
//     Square = 'Square',
//     Circle = 'Circle',
//     Parallelogram = 'Parallelogram'
// }

// export default function Shapes({ shape, color, size = params.size.width }: Props) {
//   const fill = color ?? DEFAULT_COLOR;

//   const w = size;
//   const h = size;
//   const paraOffset = w * 0.25; // skew amount
//   const parallelogramPoints = `${paraOffset},0 ${w + paraOffset},0 ${w - paraOffset},${h} ${-paraOffset},${h}`;

//   switch (shape) {
//     case Shape.Circle:
//       return <View style={[styles.circleBase, { backgroundColor: fill }]} />;
//     case Shape.Triangle:
//       return <View style={[styles.triangleBase, { borderBottomColor: fill }]} />;
//     case Shape.Square:
//       return <View style={[styles.squareBase, { backgroundColor: fill }]} />;
//     case Shape.Parallelogram:
//         return <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
//             <Polygon points={parallelogramPoints} fill={fill} />
//         </Svg>
//     default:
//       return <View />;
//   }
// }

// const params = {
//     size: {
//         width: 150,
//         heigth: 150,
//         radius: 150/2,
//         triangleSide: 75,
//     },
//     colors: {
//         red: '#f00',
//         blue: '#00f',
//         green: '#0f0'
//     }
// }

// const DEFAULT_COLOR = params.colors.red;

// const styles = StyleSheet.create({
//   circleBase: {
//     width: params.size.width,
//     height: params.size.heigth,
//     borderRadius: params.size.radius,
//   },
//   squareBase: {
//     width: params.size.width,
//     height: params.size.heigth,
//   },
//   triangleBase: {
//     height: 0,
//     borderLeftWidth: params.size.triangleSide,
//     borderRightWidth: params.size.triangleSide,
//     borderBottomWidth: params.size.width,
//     borderStyle: 'solid',
//     backgroundColor: 'transparent',
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//   },
//   parallelogramBase: {

//   },
// });
import React, { useState } from "react";
import { ColorValue, LayoutChangeEvent, View, ViewStyle } from "react-native";
import Svg, { Polygon } from "react-native-svg";

type Props = {
  shape: Shape;
  color?: ColorValue;
  size?: number; // optional fixed size in px
  style?: ViewStyle; // container style to allow flexGrow / flexBasis etc.
  shapeStyle?: ViewStyle; // extra style for the inner shape container
};

export enum Shape {
  Triangle = "Triangle",
  Square = "Square",
  Circle = "Circle",
  Parallelogram = "Parallelogram",
  Pentagon = "Pentagon",
}

const params = { colors: { red: "#f00" } };
const DEFAULT_COLOR = params.colors.red;

export default function Shapes({
  shape,
  color,
  size,
  style,
  shapeStyle,
}: Props) {
  const fill = (color as string) ?? DEFAULT_COLOR;
  const [measuredSize, setMeasuredSize] = useState<number | null>(null);
  const effectiveSize = size ?? measuredSize ?? 50;

  function onLayout(e: LayoutChangeEvent) {
    if (size) return;
    const { width, height } = e.nativeEvent.layout;
    const s = Math.min(width, height);
    if (s && s !== measuredSize) setMeasuredSize(s);
  }

  // If we don't have an effective size yet, render an empty container to measure
  const containerStyle: ViewStyle = [
    { alignItems: "center", justifyContent: "center" },
    style,
  ];

  if (!effectiveSize) {
    // Render measuring container (will get size from flex)
    return <View style={containerStyle} onLayout={onLayout} />;
  }

  const w = effectiveSize;
  const h = effectiveSize;
  const half = w / 2;
  const triangleHalf = w / 2; // base/2
  const trianglePoints = `0,0 ${w},0 ${half},${h}`;
  const paraOffset = w * 0.25;
  const parallelogramPoints = `${paraOffset},0 ${w + paraOffset},0 ${w - paraOffset},${h} ${-paraOffset},${h}`;

  const innerWrapper: ViewStyle = {
    width: w,
    height: h,
    ...((shapeStyle as object) || {}),
  };

  switch (shape) {
    case Shape.Circle:
      return (
        <View style={containerStyle} onLayout={onLayout}>
          <View
            style={[
              innerWrapper,
              { borderRadius: half, backgroundColor: fill },
            ]}
          />
        </View>
      );

    case Shape.Triangle:
      return (
        <View style={containerStyle} onLayout={onLayout}>
          <View
            style={[
              {
                width: 0,
                height: 0,
                borderLeftWidth: triangleHalf,
                borderRightWidth: triangleHalf,
                borderBottomWidth: w,
                borderStyle: "solid",
                backgroundColor: "transparent",
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: fill,
              },
              shapeStyle,
            ]}
          />
        </View>
      );

    case Shape.Square:
      return (
        <View style={containerStyle} onLayout={onLayout}>
          <View style={[innerWrapper, { backgroundColor: fill }]} />
        </View>
      );

    case Shape.Parallelogram:
      return (
        <View style={containerStyle} onLayout={onLayout}>
          <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <Polygon points={parallelogramPoints} fill={fill} />
          </Svg>
        </View>
      );

    default:
      return <View style={containerStyle} onLayout={onLayout} />;
  }
}

// const styles = StyleSheet.create({
//   // keep empty — sizing now controlled via props and computed styles
// });
