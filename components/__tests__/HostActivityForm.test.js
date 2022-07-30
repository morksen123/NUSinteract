import React from "react";
import renderer from 'react-test-renderer';
import HostActivityForm from '../hostActivity/HostActivityForm';


test('renders correctly', () => {
    const tree = renderer.create(<HostActivityForm/>).toJSON();
    expect(tree).toMatchSnapshot();
  });