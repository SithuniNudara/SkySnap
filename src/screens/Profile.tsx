import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, View,Text } from "react-native";
import { RootParamList } from "../../App";

type ProfileNavigationProps = RouteProp<RootParamList,"Profile">;

type Props = {
    route:ProfileNavigationProps;
};

export function ProfileScreen({route}:Props){
    const navigation  = useNavigation();
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button 
                title="Go To Back"
                onPress={()=>{
                navigation.goBack();
                        }}
            />
            <View>
                <Text>User Id:{route.params?.userId}</Text>
                <Text>User Name:{route.params?.name}</Text>
            </View>
        </View>
    );
}