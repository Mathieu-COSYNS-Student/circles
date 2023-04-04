import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text } from './Themed';
import { Circle, circleSchema } from '@circles/shared';

export const CirclesListItem = ({ circle }: { circle: Circle }) => {
  const router = useRouter();
  const onPress = () => {
    router.push('/circles/1');
  };

  const result = circleSchema.safeParse(circle);
  if (!result.success) {
    console.log(result.error.message);
  }
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text>
            {circle.id} - {circle.name}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 50,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#777',
  },
});
