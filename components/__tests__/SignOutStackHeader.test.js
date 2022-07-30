import React from "react";
import renderer from 'react-test-renderer';
import SignOutStackHeader from '../header/SignOutStackHeader';


test('renders correctly', () => {
    const tree = renderer.create(<SignOutStackHeader/>).toJSON();
    expect(tree).toMatchSnapshot();
  });