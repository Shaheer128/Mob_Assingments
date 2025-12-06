// context/ExerciseContext.js

import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const ExerciseContext = createContext();

// Dummy Data to start with
const initialExercises = [
  {
    id: '1',
    name: 'Push-ups',
    description: 'A basic strength training exercise to work the chest, shoulders, and triceps.',
    image: 'https://cdn-icons-png.flaticon.com/512/3233/3233215.png', // Placeholder
  },
  {
    id: '2',
    name: 'Squats',
    description: 'A lower body exercise to work the quadriceps, hamstrings, and glutes.',
    image: 'https://cdn-icons-png.flaticon.com/512/3233/3233215.png', // Placeholder
  },
];

// 2. Create the Provider Component
export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState(initialExercises);

  const addExercise = (newExercise) => {
    // Assign a simple unique ID for the new exercise
    const newId = (exercises.length + 1).toString();
    setExercises((currentExercises) => [
      ...currentExercises,
      { ...newExercise, id: newId },
    ]);
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};

// 3. Create a Custom Hook for easy use
export const useExercises = () => {
  return useContext(ExerciseContext);
};