import React from "react";
import renderer from 'react-test-renderer';
import SignInStackHeader from '../header/SignInStackHeader';


test('renders correctly', () => {
    const tree = renderer.create(<SignInStackHeader/>).toJSON();
    expect(tree).toMatchSnapshot();
  });