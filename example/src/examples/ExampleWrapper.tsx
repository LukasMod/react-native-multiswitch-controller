import { StyleSheet, Text, View } from 'react-native';

export default function ExampleWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  exampleContainer: {},

  title: {
    fontSize: 18,
    padding: 10,
  },
});
