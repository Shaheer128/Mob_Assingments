import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

// --- Gold & Black Aesthetic Color Palette ---
const GOLD_PRIMARY = '#FFD700';
const BLACK_BACKGROUND = '#121212';
const DARK_CARD = '#1E1E1E';
const LIGHT_TEXT = '#E0E0E0';
const SUBTLE_TEXT = '#8A8A8A';

export default function ExerciseDetail() {
  // Destructuring with proper type assertion for useLocalSearchParams in a real app
  const { 
    name = 'Unknown Exercise', 
    description = 'No description provided.', 
    image = 'https://via.placeholder.com/400x250?text=No+Image' 
  } = useLocalSearchParams() as { name?: string, description?: string, image?: string };

  return (
    // Gold Gradient Background (matching the HomeScreen)
    <LinearGradient
      colors={['#101010', '#000000', '#181005']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.fullScreenContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Image Container with Shadow */}
        <View style={styles.imageContainer}>
          <Image 
            // Use local image or fallback if URL is empty/invalid
            source={{ uri: image.length > 5 ? image : 'https://via.placeholder.com/400x250?text=No+Image' }} 
            style={styles.image} 
          />
        </View>

        {/* Title and Details */}
        <Text style={styles.title}>{name}</Text>
        
        <View style={styles.separator} />

        <Text style={styles.section}>Description</Text>
        <Text style={styles.text}>{description}</Text>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: { 
    flex: 1, 
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // --- Image Styling ---
  imageContainer: {
    // Container handles the shadow, the image handles the corner radius
    ...Platform.select({
      ios: {
        shadowColor: GOLD_PRIMARY,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      }
    }),
    borderRadius: 20,
    overflow: 'hidden', // Crucial for image to respect border radius
  },
  image: {
    height: 250,
    width: '100%',
    backgroundColor: DARK_CARD, // Dark placeholder color
  },
  
  // --- Text Styling ---
  title: { 
    fontSize: 34, 
    fontWeight: '800', 
    marginTop: 25,
    marginBottom: 10,
    color: GOLD_PRIMARY, // Gold Title
  },
  
  separator: {
    height: 1,
    backgroundColor: SUBTLE_TEXT + '30', // Faint separator line
    marginVertical: 15,
  },
  
  section: { 
    marginTop: 10, 
    fontSize: 22, 
    fontWeight: '700', 
    color: LIGHT_TEXT, // Light text for section headers
  },
  text: { 
    marginTop: 8, // Increased spacing
    fontSize: 17, // Slightly larger body text
    color: SUBTLE_TEXT, // Muted gray for reading comfort
    lineHeight: 26, // Increased line height for readability
  },
});