import * as React from 'react';
import renderer from 'react-test-renderer';

import { Text } from '../Themed';

it(`renders correctly`, () => {
  const tree = renderer.create(<Text>Test link!</Text>).toJSON();

  expect(tree).toMatchSnapshot();
});
