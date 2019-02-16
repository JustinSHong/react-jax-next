import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Router from "next/router";

import Home from "../pages/index.js";

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("with snapshot testing", () => {
    it("Home matches previous snapshot", () => {
        const component = renderer.create(<Home />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Home", () => {
    it("Should have a header", () => {
        const component = shallow(<Home />);
        expect(component.find("h1")).toHaveLength(1);
    });
});
