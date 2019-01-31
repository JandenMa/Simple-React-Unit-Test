import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Calc from "./calc.component";

Enzyme.configure({ adapter: new Adapter() });

describe("Test calc component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calc />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render without throwing an error", () => {
    expect(wrapper.find(".calc-box").length).toBe(1);
    expect(wrapper.find("input[type='number']").length).toBe(9);
  });

  it("should has 15 span nodes", () => {
    expect(wrapper.find("span").length).toBe(15);
  });

  it("calls component handleNumChange", () => {
    const spyFunction = jest.spyOn(wrapper.instance(), "handleNumChange");
    wrapper.instance().handleNumChange();
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockRestore();
  });

  it("change input to be done", () => {
    wrapper
      .find("input")
      .at(2)
      .simulate("change", { target: { value: 2 } });
    expect(wrapper.state().subNum1).toBe(2);
  });
});
