import React from "react";
import renderer from 'react-test-renderer';
import CustomModal from '../Dialog/CustomModal';


test('renders correctly', () => {
    const tree = renderer.create(<CustomModal title={'Test'} body={'testing modal'}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });