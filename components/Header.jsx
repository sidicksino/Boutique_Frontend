import { styles } from '@/assets/style/home.style';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


const Header = () => {

  const router = useRouter();

  const profilePress = () => {
    router.push('pages/ProfileScreen')
  };
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Sino</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="search-outline" style={styles.headerIcon} />
          <TouchableOpacity onPress={profilePress} style={styles.logoSocial}>
          <Image
            source={ require('../assets/images/avatar.jpeg') }
            style={styles.headerLogo}
          />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Header;