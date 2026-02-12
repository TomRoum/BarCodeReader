import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Needs camera permission</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </Pressable>
      </View>
    )
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return
    setScanned(true)
    Alert.alert("Barcode Scanned!", data, [
      { text: "Scan Again", onPress: () => setScanned(false) },
    ])
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        onBarcodeScanned={handleBarCodeScanned}
      />
      <Text style={styles.scanText}>Scan Barcode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0BCD4C",
    padding: 15,
    borderRadius: 8,
  },
  scanText: {
    position: "absolute",
    bottom: 50,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
