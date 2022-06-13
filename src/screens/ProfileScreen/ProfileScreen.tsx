import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import HeaderComponent from '../../components/common/HeaderComponent';

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <HeaderComponent title="Profile" />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
