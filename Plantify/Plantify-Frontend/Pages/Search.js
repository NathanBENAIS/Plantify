import React, { useState, useCallback, useMemo, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductList from '../components/ProductList';
import PlantsMap from '../components/PlantsMap';
import { PLANTS_DATA } from '../data/PlantsData';

const ITEMS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 300;

const categories = [
  { id: '1', name: 'Toutes', icon: 'grid-outline', group: 'general' },
  // Difficulté
  { id: '2', name: 'Facile', icon: 'leaf-outline', group: 'difficulty' },
  { id: '3', name: 'Modérée', icon: 'flower-outline', group: 'difficulty' },
  { id: '4', name: 'Difficile', icon: 'warning-outline', group: 'difficulty' },
  // Bienfaits thérapeutiques
  { id: '5', name: 'Stress', icon: 'fitness-outline', group: 'therapeutic' },
  { id: '6', name: 'Sommeil', icon: 'moon-outline', group: 'therapeutic' },
  { id: '7', name: 'Digestion', icon: 'medical-outline', group: 'therapeutic' },
  { id: '8', name: 'Peau', icon: 'bandage-outline', group: 'therapeutic' },
  // Minéraux
  { id: '9', name: 'Calcium', icon: 'nutrition-outline', group: 'minerals' },
  { id: '10', name: 'Potassium', icon: 'nutrition-outline', group: 'minerals' },
  { id: '11', name: 'Fer', icon: 'nutrition-outline', group: 'minerals' },
  { id: '12', name: 'Magnésium', icon: 'nutrition-outline', group: 'minerals' },
  // Vitamines
  { id: '13', name: 'Vitamine A', icon: 'flask-outline', group: 'vitamins' },
  { id: '14', name: 'Vitamine C', icon: 'flask-outline', group: 'vitamins' },
  { id: '15', name: 'Vitamine E', icon: 'flask-outline', group: 'vitamins' },
  // Antioxydants
  { id: '16', name: 'Polyphénols', icon: 'shield-outline', group: 'antioxidants' },
  { id: '17', name: 'Flavonoïdes', icon: 'shield-outline', group: 'antioxidants' },
  { id: '18', name: 'Anthraquinones', icon: 'shield-outline', group: 'antioxidants' }
];

// Cache pour les résultats de filtrage
const filterCache = new Map();

// Fonction de filtrage optimisée
const filterPlants = (plants, searchTerm, selectedCategories) => {
  const cacheKey = `${searchTerm}-${selectedCategories.sort().join(',')}`;
  
  if (filterCache.has(cacheKey)) {
    return filterCache.get(cacheKey);
  }

  const searchLower = searchTerm.toLowerCase();
  const isAllSelected = selectedCategories.includes('Toutes');

  // Si "Toutes" est sélectionné, on ne filtre que par le terme de recherche
  if (isAllSelected) {
    const result = plants.filter(plant => 
      plant.name.toLowerCase().includes(searchLower) ||
      plant.scientificName.toLowerCase().includes(searchLower)
    );
    filterCache.set(cacheKey, result);
    return result;
  }

  const result = plants.filter(plant => {
    // Vérification du terme de recherche
    const matchesSearch = searchTerm === '' || 
      plant.name.toLowerCase().includes(searchLower) ||
      plant.scientificName.toLowerCase().includes(searchLower);
    
    if (!matchesSearch) return false;

    // Vérification des catégories
    return selectedCategories.some(category => {
      // Vérification de la difficulté
      if (['Facile', 'Modérée', 'Difficile'].includes(category)) {
        return plant.difficulty === category;
      }

      // Vérification des bienfaits thérapeutiques
      if (['Stress', 'Sommeil', 'Digestion', 'Peau'].includes(category)) {
        return plant.characteristics?.therapeuticUses?.some(
          use => use.toLowerCase().includes(category.toLowerCase())
        );
      }

      // Vérification des minéraux
      if (['Calcium', 'Potassium', 'Fer', 'Magnésium'].includes(category)) {
        return plant.characteristics?.minerals?.includes(category);
      }

      // Vérification des vitamines
      if (['Vitamine A', 'Vitamine C', 'Vitamine E'].includes(category)) {
        return plant.characteristics?.vitamins?.includes(category);
      }

      // Vérification des antioxydants
      if (['Polyphénols', 'Flavonoïdes', 'Anthraquinones'].includes(category)) {
        return plant.characteristics?.antioxidants?.includes(category);
      }

      return false;
    });
  });

  filterCache.set(cacheKey, result);
  
  if (filterCache.size > 100) {
    const firstKey = filterCache.keys().next().value;
    filterCache.delete(firstKey);
  }

  return result;
};

const CategoryButton = React.memo(({ item, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.categoryButton,
      isSelected && styles.categoryButtonActive
    ]}
    onPress={() => onPress(item.name)}
  >
    <Ionicons 
      name={item.icon} 
      size={22} 
      color={isSelected ? '#FFFFFF' : '#539211'} 
    />
    <Text style={[
      styles.categoryButtonText,
      isSelected && styles.categoryButtonTextActive
    ]}>
      {item.name}
    </Text>
  </TouchableOpacity>
));

const CategoryGroup = React.memo(({ group, categories, selectedCategories, onToggleCategory }) => (
  <View style={styles.categoryGroup}>
    <Text style={styles.groupTitle}>
      {group === 'difficulty' ? 'Difficulté' : 
       group === 'therapeutic' ? 'Bienfaits' :
       group === 'minerals' ? 'Minéraux' :
       group === 'vitamins' ? 'Vitamines' :
       group === 'antioxidants' ? 'Antioxydants' : ''}
    </Text>
    <View style={styles.categoryRow}>
      {categories.map((item) => (
        <CategoryButton
          key={item.id}
          item={item}
          isSelected={selectedCategories.includes(item.name)}
          onPress={onToggleCategory}
        />
      ))}
    </View>
  </View>
));

export default function Search() {
  const [showMaps, setShowMaps] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['Toutes']);
  const [showFilters, setShowFilters] = useState(false);
  const [filterAnimation] = useState(new Animated.Value(0));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const searchTimeout = useRef(null);
  const loadMoreTimeout = useRef(null);

  const toggleCategory = useCallback((categoryName) => {
    setIsFiltering(true);
    
    setSelectedCategories(prev => {
      if (categoryName === 'Toutes') {
        return ['Toutes'];
      }
      
      // Si on désélectionne une catégorie
      if (prev.includes(categoryName)) {
        const newCategories = prev.filter(cat => cat !== categoryName);
        return newCategories.length === 0 ? ['Toutes'] : newCategories;
      }
      
      // Si on sélectionne une nouvelle catégorie
      return ['Toutes'].includes(prev[0]) 
        ? [categoryName]
        : [...prev, categoryName];
    });
    
    setCurrentPage(1);
    
    requestAnimationFrame(() => {
      setIsFiltering(false);
    });
  }, []);

  const filteredPlants = useMemo(() => {
    return filterPlants(PLANTS_DATA, searchTerm, selectedCategories);
  }, [searchTerm, selectedCategories]);

  const paginatedPlants = useMemo(() => {
    return filteredPlants.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [filteredPlants, currentPage]);

  const handleSearchChange = useCallback((text) => {
    setSearchTerm(text);
    
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(() => {
      setCurrentPage(1);
    }, DEBOUNCE_DELAY);
  }, []);

  const loadMore = useCallback(() => {
    if (isLoadingMore || paginatedPlants.length >= filteredPlants.length) return;
    
    setIsLoadingMore(true);
    
    if (loadMoreTimeout.current) {
      clearTimeout(loadMoreTimeout.current);
    }

    loadMoreTimeout.current = setTimeout(() => {
      requestAnimationFrame(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoadingMore(false);
      });
    }, 100);
  }, [isLoadingMore, paginatedPlants.length, filteredPlants.length]);

  const toggleFilters = useCallback(() => {
    const toValue = !showFilters ? 1 : 0;
    Animated.spring(filterAnimation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
    }).start();
    setShowFilters(!showFilters);
  }, [showFilters, filterAnimation]);

  const toggleView = useCallback((showMap) => {
    setShowMaps(showMap);
    Animated.spring(animation, {
      toValue: showMap ? 1 : 0,
      useNativeDriver: true,
      tension: 20,
      friction: 7
    }).start();
  }, [animation]);

  const slideAnimation = useMemo(() => (
    animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%']
    })
  ), [animation]);

  const slideInAnimation = useMemo(() => (
    animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['100%', '0%']
    })
  ), [animation]);

  const categoryGroups = useMemo(() => {
    const groups = ['general', 'difficulty', 'therapeutic', 'minerals', 'vitamins', 'antioxidants'];
    return groups.map(group => ({
      group,
      categories: categories.filter(cat => cat.group === group)
    }));
  }, []);

  const renderContent = () => {
    if (isFiltering && !searchTerm) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#539211" />
          <Text style={styles.loadingText}>Filtrage en cours...</Text>
        </View>
      );
    }
  
    if (filteredPlants.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Aucune plante ne correspond à vos critères de recherche
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <Animated.View
          style={[styles.animatedContent, { transform: [{ translateX: slideAnimation }] }]}
        >
          <ProductList 
            plants={paginatedPlants}
            onLoadMore={loadMore}
            isLoadingMore={isLoadingMore}
            hasMore={paginatedPlants.length < filteredPlants.length}
          />
        </Animated.View>
  
        <Animated.View
          style={[styles.animatedContent, { transform: [{ translateX: slideInAnimation }] }]}
        >
          <PlantsMap plants={paginatedPlants} />
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#B4D8B2" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Découvrir les plantes</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => toggleView(true)}
              activeOpacity={0.8}
              style={[styles.toggleButton, styles.leftButton, showMaps && styles.activeButton]}
            >
              <Ionicons name="map" size={20} color={showMaps ? '#FFF' : '#1A3B0A'} />
              <Text style={[styles.buttonText, showMaps && styles.activeButtonText]}>
                Carte
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleView(false)}
              activeOpacity={0.8}
              style={[styles.toggleButton, styles.rightButton, !showMaps && styles.activeButton]}
            >
              <Ionicons name="list" size={20} color={!showMaps ? '#FFF' : '#1A3B0A'} />
              <Text style={[styles.buttonText, !showMaps && styles.activeButtonText]}>
                Liste
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#1A3B0A" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une plante..."
              placeholderTextColor="#6B7280"
              value={searchTerm}
              onChangeText={handleSearchChange}
            />
          </View>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive
            ]} 
            onPress={toggleFilters}
          >
            <Ionicons 
              name="options-outline" 
              size={24} 
              color={showFilters ? '#FFFFFF' : '#1A3B0A'} 
            />
          </TouchableOpacity>
        </View>

        <Animated.View style={[
          styles.categoriesContainer,
          {
            transform: [{
              translateY: filterAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0]
              })
            }],
            opacity: filterAnimation
          }
        ]}>
          {showFilters && (
            <ScrollView 
              style={styles.categoriesScrollView}
              contentContainerStyle={styles.categoriesList}
              showsVerticalScrollIndicator={true}
            >
              {categoryGroups.map(({group, categories}) => (
                <CategoryGroup
                  key={group}
                  group={group}
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onToggleCategory={toggleCategory}
                />
              ))}
            </ScrollView>
          )}
        </Animated.View>

        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#B4D8B2',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {    
    backgroundColor: '#B4D8B2',
    paddingTop: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontFamily: 'Belleza',
    fontWeight:'700',
    fontSize: 24,
    color: '#1A3B0A',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    minWidth: 120,
  },
  leftButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderRightWidth: 0,
  },
  rightButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginLeft: -18,
    marginTop: 2,
  },
  activeButton: {
    backgroundColor: '#1A3B0A',
  },
  buttonText: {
    color: '#1A3B0A',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  activeButtonText: {
    color: '#FFF',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 2,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1A3B0A',
  },
  filterButton: {
    backgroundColor: '#B4D8B2',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#1A3B0A',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    maxHeight: 450,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  categoriesScrollView: {
    flexGrow: 0,
  },
  categoriesList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryGroup: {
    marginBottom: 15,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A3B0A',
    marginBottom: 8,
    paddingLeft: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#539211',
  },
  categoryButtonActive: {
    backgroundColor: '#539211',
    borderColor: '#539211',
  },
  categoryButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#539211',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  animatedContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#539211',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
  }
});