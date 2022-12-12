import {HStack, Spinner, Heading} from 'native-base';

const Loading = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="lg" size="lg">
        Loading
      </Heading>
    </HStack>
  );
};

export default Loading;
