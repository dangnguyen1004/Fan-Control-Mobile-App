import React from 'react';
import { View } from 'react-native';
import Svg, { Path,Defs,LinearGradient,Stop,Rect } from 'react-native-svg';
export default function WavyHeader({ customStyles }) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: 'red', height: 160 }}>
        <Svg 
            height="100%" 
            width="100%"
            style={{position: 'absolute'}}>
        <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor='#2F80ED' stopOpacity="1" />
            <Stop offset="1" stopColor='#56CCF2' stopOpacity="1" />
            </LinearGradient>
        </Defs>
        <Rect
            width="100%"
            height="100%"
            fill="url(#grad)"
          />
        </Svg>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 130 }}
        >
        <Path
        fill="url(#grad)"
        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor='#2F80ED' stopOpacity="1" />
            <Stop offset="1" stopColor='#56CCF2' stopOpacity="1" />
            </LinearGradient>
        </Defs>
          

        </Svg>
      </View>
    </View>
  );
}