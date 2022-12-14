import {HStack, Spinner, Heading} from 'native-base';

const Loading = () => {
  return (
    <HStack space={2} justifyContent="center" alignItems="center">
      <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="primary.500" fontSize="5xl">
        Loading
      </Heading>
    </HStack>
  );
};

export default Loading;
