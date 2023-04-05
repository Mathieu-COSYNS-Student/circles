import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Chat from '@components/chat/Chat';
import { RootStackParamList } from '@navigators/root';

type CircleScreenProps = NativeStackScreenProps<RootStackParamList, 'Circle'>;

const CircleScreen = ({}: CircleScreenProps) => {
  return <Chat />;
};

export default CircleScreen;
