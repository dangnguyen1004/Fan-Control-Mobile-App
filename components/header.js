import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
export function Headline() {
  return (
      
    <Svg height="100%" width="100%">
  <Defs>
    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0" stopColor="#2F80ED" stopOpacity="1" />
      <Stop offset="1" stopColor="#56CCF2" stopOpacity="1" />
    </LinearGradient>
  </Defs>
  <Rect
    width="100%"
    height="100%"
    fill="url(#grad)"
  />
</Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
