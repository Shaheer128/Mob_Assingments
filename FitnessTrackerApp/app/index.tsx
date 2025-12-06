import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PressableScale from '../components/PressableScale';
import { useExercises } from '../context/ExerciseContext';

// --- Gold & Black Aesthetic Color Palette ---
const GOLD_PRIMARY = '#FFD700';
const BLACK_BACKGROUND = '#121212';
const DARK_CARD = '#1E1E1E';
const LIGHT_TEXT = '#E0E0E0';
const SUBTLE_TEXT = '#8A8A8A';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { exercises } = useExercises();

  React.useLayoutEffect(() => {
    // ... (header configuration remains the same)
    navigation.setOptions({
      headerStyle: { 
        backgroundColor: BLACK_BACKGROUND,
        borderBottomWidth: 0,
        shadowOpacity: 0,
      }, 
      headerTitleStyle: { 
        fontWeight: '800', 
        fontSize: 28, 
        color: GOLD_PRIMARY,
      },
      headerRight: () => (
        <Link href="/add" asChild>
          <PressableScale style={styles.addButtonContainer}> 
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </PressableScale>
        </Link>
      ),
    });
  }, []);

  const renderItem = ({ item }) => (
    <Link href={{ pathname: '/[id]', params: item }} asChild>
      <PressableScale style={styles.card}>
        <LinearGradient
          colors={[DARK_CARD, '#282828']} 
          style={styles.cardInner}
        >
          <View style={styles.textGroup}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.subTextPill}>
              <Text style={styles.subText}>Tap for routine</Text>
            </View>
          </View>
          <Text style={styles.arrow}>→</Text> 
        </LinearGradient>
      </PressableScale>
    </Link>
  );

  return (
    <LinearGradient
      // 🥇 ENHANCED GRADIENT PROPERTIES 🥇
      colors={['#101010', '#000000', '#181005']} // Black, True Black, and a very dark brown/gold shadow
      start={{ x: 0, y: 0 }} // Start top-left
      end={{ x: 1, y: 1 }}   // End bottom-right (diagonal flow)
      style={styles.container}
    >
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises yet. Tap '+' to add one!</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
// ... (rest of the styles are the same as the previous response)

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  card: {
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
    
    shadowColor: '#000000', 
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  cardInner: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 100,
  },

  textGroup: {
    flexShrink: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: LIGHT_TEXT,
    marginBottom: 8,
  },

  subTextPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: GOLD_PRIMARY + '1A', 
    alignSelf: 'flex-start',
  },

  subText: {
    fontSize: 14,
    color: GOLD_PRIMARY,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 36,
    color: GOLD_PRIMARY, 
    fontWeight: '400',
  },

  addButtonContainer: {
    marginRight: 10,
  },
  addButton: {
    backgroundColor: GOLD_PRIMARY,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: GOLD_PRIMARY,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  addButtonText: {
    color: BLACK_BACKGROUND,
    fontSize: 30,
    fontWeight: '400',
  },
  
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: SUBTLE_TEXT,
    textAlign: 'center',
    lineHeight: 24,
  }
});