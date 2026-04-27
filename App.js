import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  // ✅ Función movida arriba, antes de los returns
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // ✅ TouchableOpacity suelto eliminado

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          La cámara no está disponible en web aquí 😢
        </Text>
      </View>
    );
  }

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos tu permiso para acceder a la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" /> // ✅ Ahora Button está importado
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Voltear cámara</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});