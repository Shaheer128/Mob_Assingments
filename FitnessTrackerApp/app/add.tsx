import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useExercises } from '../context/ExerciseContext';

// --- Gold & Black Aesthetic Color Palette ---
const GOLD_PRIMARY = '#FFD700'; // Pure Gold for primary accents
const BLACK_BACKGROUND = '#121212'; // Deep, true black background
const DARK_CARD = '#1E1E1E'; // Slightly lighter black for card/input base
const LIGHT_TEXT = '#E0E0E0'; // Soft white for main text
const SUBTLE_TEXT = '#8A8A8A'; // Muted gray for placeholders/borders

export default function AddExerciseScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const { addExercise } = useExercises();

  const save = () => {
    if (!name.trim()) return; 
    addExercise({ name, description, image });
    router.back();
  };

  return (
    // Gold Gradient Background (matching the HomeScreen)
    <LinearGradient
      colors={['#101010', '#000000', '#181005']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>New Workout Item</Text>

        {/* Name Input */}
        <Text style={styles.label}>Exercise Name</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={setName} 
          value={name} 
          placeholder="e.g., Barbell Bench Press"
          placeholderTextColor={SUBTLE_TEXT}
          keyboardAppearance="dark" // Aesthetic improvement for dark mode
        />

        {/* Description Input */}
        <Text style={styles.label}>Description & Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          onChangeText={setDescription}
          value={description}
          multiline
          placeholder="Detailed steps or personal tips"
          placeholderTextColor={SUBTLE_TEXT}
          textAlignVertical='top'
          keyboardAppearance="dark"
        />

        {/* Image URL Input */}
        <Text style={styles.label}>Image URL (Optional)</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={setImage} 
          value={image} 
          placeholder="Link to an exercise image/GIF"
          placeholderTextColor={SUBTLE_TEXT}
          keyboardAppearance="dark"
        />

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveBtn, !name.trim() && styles.saveBtnDisabled]} 
          onPress={save}
          disabled={!name.trim()}
        >
          <Text style={styles.saveText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  scrollContent: {
    padding: 25,
  },
  header: { 
    fontSize: 30, 
    fontWeight: '800', 
    marginBottom: 30, 
    color: GOLD_PRIMARY, // Gold Header
  },
  label: { 
    fontWeight: '600', 
    color: LIGHT_TEXT, // Light text labels
    marginTop: 18, 
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: DARK_CARD, // Dark input background
    color: LIGHT_TEXT, // Light input text
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SUBTLE_TEXT + '40', // Muted border
    
    // Subtle shadow for dark mode lift
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5, // Stronger shadow for lift on dark surface
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      }
    }),
  },
  textArea: { 
    height: 140,
    paddingTop: 15,
  },
  saveBtn: {
    marginTop: 40,
    backgroundColor: GOLD_PRIMARY, // Gold button
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    
    // Gold shadow for the primary action button
    shadowColor: GOLD_PRIMARY,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  saveBtnDisabled: {
    backgroundColor: SUBTLE_TEXT, // Muted gray when disabled
    shadowOpacity: 0.1,
  },
  saveText: { 
    color: BLACK_BACKGROUND, // Black text on gold button
    fontSize: 18, 
    fontWeight: '700' 
  },
});