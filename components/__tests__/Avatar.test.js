import React from "react";
import renderer from 'react-test-renderer';
import Avatar from "../profile/Avatar";


test('renders correctly', () => {
    const data = [{ name: 'dummy', avatar_url: 'avatars/blank-profile-picture-973460_1280.webp'}]
    const tree = renderer.create(<Avatar data={data}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });