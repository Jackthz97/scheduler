import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";
import { fireEvent } from "@testing-library/react";
import { action } from "@storybook/addon-actions";

afterEach(cleanup);


describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});