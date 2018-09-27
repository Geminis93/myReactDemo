import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, render } from 'enzyme';
// import TestUtils from 'react-addons-test-utils';

import AntdDemo from './index';

configure({adapter: new Adapter()});

describe('AntdDemo component', () => {
  it('should render dom', () => {
    const wrapper = shallow(<AntdDemo />);

    const buttonObj = wrapper.find('.login');

    console.info(`查找到button的个数：${buttonObj.length}`);
    // TestUtils.Simulate.click(buttonObj);
    buttonObj.simulate('click');
  })
})