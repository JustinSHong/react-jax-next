import React from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";

import Home from "../pages/index.js";

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("with snapshot testing", () => {
    it("renders correctly", () => {
        const component = create(<Home />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// using enzyme shallow method
describe("Home using shallow()", () => {
    it("should have a header", () => {
        const component = shallow(<Home />);
        expect(component.find("h1")).toHaveLength(1);
    });
});

// using react-test-renderer
describe("Home using create()", () => {
    it("should have a header", () => {
        const component = create(<Home />);
        const header = component.root.findByType("h1");
        console.log(header.props.children);
        expect(header).toBeTruthy();
        expect(header.props.children).toBe(
            "My First Little Next.js App...featuring Star Wars!"
        );
    });
});
