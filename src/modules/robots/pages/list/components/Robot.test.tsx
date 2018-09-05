import * as React from 'react';
import { shallow } from 'enzyme';
import Robot from './Robot';


const robot = {
  "id": 1099,
  "name": "Jessica Montes",
  "configuration": {
      "color": "blue",
      "hasTracks": true,
      "hasWheels": true,
      "hasSentience": true,
      "numberOfRotors": 7
  },
  "status": [
      "on fire"
  ],
  "qa_status": null,
  "is_recyclable": true
}

it('renders robot title properly', () => {
  const wrapper = shallow(
    <Robot
      id={robot.id}
      name={robot.name}
      configuration={robot.configuration}
      status={robot.status}
    />
  );

  const title = `${robot.id}-${robot.name}`
  expect(wrapper.html().includes(title)).toEqual(true);
});
