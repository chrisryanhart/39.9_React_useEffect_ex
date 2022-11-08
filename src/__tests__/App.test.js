import React from 'react';
import {render} from "@testing-library/react"
// import ReactDOM from 'react-dom';
import App from '../App';


it("renders without crashing", function() {
  render(<App/>);
})

it("renders without crashing", function() {
  const {asFragment} = render(<App/>);
  expect(asFragment()).toMatchSnapshot();
})