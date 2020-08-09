import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Linking,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";

interface RouteParams {
  event_id: number;
}

interface Data {
  event: {
    image: string;
    image_url: string;
    name: string;
    whatsapp: string;
    city: string;
    date: string;
    time: string;
    description: string;
    uf: string;
    items: string[];
  };
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  useEffect(() => {
    api.get(`/events/${routeParams.event_id}`).then((response) => {
      setData({ event: response.data });
    });
  }, []);

  function handleNavigationBack() {
    navigation.goBack();
  }

  function handleWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.event.whatsapp}&text=Tenho interesse sobre o evento, ${data.event.name}.`
    );
  }

  if (!data.event) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" size={25} color="#5283CE" />
        </TouchableOpacity>

        <Image
          style={styles.eventImage}
          source={{
            uri: data.event.image_url,
          }}
        />
        <Text style={styles.eventName}>{data.event.name}</Text>
        <Text style={styles.eventItems}>
          {data.event.items.map((item) => item).join(", ")}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>
            <FontAwesome name="calendar" size={20} color="#6C6C80" /> Data
          </Text>
          <Text style={styles.addressContent}>
            {data.event.date}, {data.event.time}
          </Text>
        </View>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Descrição</Text>
          <Text style={styles.addressContent}>{data.event.description}</Text>
        </View>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.event.city}, {data.event.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button}>
          <FontAwesome name="share" size={20} color="#fff" />
          <Text style={styles.buttonText}>Compartilhar</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  eventImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  eventName: {
    color: "#322153",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  eventItems: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#5283CE",
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: "#322153",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "48%",
    backgroundColor: "#5283CE",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },
});

export default Detail;
