import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@components/Themed';
import { RootStackParamList } from '@navigators/root';

type CircleSettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'CircleSettings'>;

const CircleSettingsScreen = ({}: CircleSettingsScreenProps) => {
  return <Text>Settings page for a circle</Text>;
};

export default CircleSettingsScreen;
