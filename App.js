import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState('denied');
  const [image, setImage] = useState(null);

  useEffect(() => {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) => setCameraPermission(status));
  }, []);

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    setImage(result);
  };

  takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    setImage(result);
  }

  if (cameraPermission === 'denied') return (
    <View style={styles.container}>
      <Text>No tienes permisos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="abrir fotos"
        onPress={pickImage}
      />
      <Button
        title="abrir camara"
        onPress={takePicture}
      />
      {image && (
        <Image
          style={{ height: 250, width: 250 }}
          source={{ uri: image.uri }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
});
