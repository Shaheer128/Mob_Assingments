// app/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';
// 1. Ensure this import path is correct based on your file structure
import { ExerciseProvider } from '../context/ExerciseContext';

export default function RootLayout() {
  return (
    // This is where the context MUST be provided to the children (the Stack Screens)
    <ExerciseProvider> 
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "💪 Shaheer's Fitness Tracker",
            // ...
          }} 
        />
        {/* ... other screens ... */}
      </Stack>
    </ExerciseProvider>
  );
}