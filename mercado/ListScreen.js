import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';

const ListScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [showSmile, setShowSmile] = useState(false);

  const handleSave = async () => {
    try {
      // Salvar os dados no AsyncStorage
      await AsyncStorage.setItem('location', location);
      await AsyncStorage.setItem('maxValue', maxValue);
      await AsyncStorage.setItem('dateTime', dateTime);
      
      // Mostrar o ícone sorrindo por 2 segundos
      setShowSmile(true);
      setTimeout(() => {
        setShowSmile(false);
        navigation.navigate('Home'); // Voltar para a tela inicial após 2 segundos
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={24} color="#FF9739" />
        </TouchableOpacity>
        <Text style={styles.title}>Lista de Compras</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Localização do mercado"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor máximo"
          value={maxValue}
          onChangeText={setMaxValue}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Data e horário da compra"
          value={dateTime}
          onChangeText={setDateTime}
          keyboardType="numeric"
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ícone sorrindo animado */}
      {showSmile && (
        <Animatable.View animation="bounceIn" style={styles.smileIcon}>
          <AntDesign name="smileo" size={80} color="#FF8517" />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6F0D15',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    paddingTop: 20,
    paddingLeft: 60,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  form: {
    flex: 1,
    paddingTop: 35,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#FF8517',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  cancelButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  smileIcon: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default ListScreen;
