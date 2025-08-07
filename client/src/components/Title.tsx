import React from 'react';
import { View } from 'react-native';
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Title() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Svg height="60" width="220">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
                        <Stop offset="0" stopColor="#7b001c" stopOpacity="1" />  
                        <Stop offset="1" stopColor="#ff0000" stopOpacity="1" /> 
                    </LinearGradient>
                </Defs>
                <SvgText
                    x="0"
                    y="40"
                    fontSize="32"
                    fill="url(#grad)"
                    fontWeight="bold"
                >
                    SommelIO 🍷
                </SvgText>
            </Svg>
        </View>
    );
}
