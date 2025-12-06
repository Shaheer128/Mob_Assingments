import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

// Define the type for the styles passed to the component
type StyleProp = any; // simplified for quick example, use proper RN types in production

// Define the component props
interface PressableScaleProps {
  children: React.ReactNode;
  onPress?: () => void;
  // Allow style to be a plain object, array, or a function that receives the state
  style?: StyleProp | ((state: { pressed: boolean; hovered: boolean }) => StyleProp);
}

export default function PressableScale({ children, onPress, style }: PressableScaleProps) {
  // Use useRef for persistent Animated.Value (as discussed earlier for stability)
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      // Pass the state object (which includes 'hovered') to the style prop
      style={({ pressed, hovered }) => [
        // 1. Apply the user's style (if it's a function, call it with the state)
        typeof style === 'function' ? style({ pressed, hovered }) : style,

        // 2. Apply the animated scale transform
        { transform: [{ scale }] },

        // 3. ✨ Add the conditional hover style for Web/Desktop
        hovered && styles.hoverShadow,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // This style will only be applied when the element is hovered over
  // It gives a subtle 'lift' effect on the web.
  hoverShadow: {
    // Note: You might need to make sure the original shadow is defined 
    // in the component's base style for this override to look good.
    shadowOpacity: 0.15, // Slightly darker shadow
    shadowRadius: 18,    // Bigger shadow blur
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  }
});