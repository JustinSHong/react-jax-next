import React from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";
// Components
import Home from "../pages/index.js";
import Navigation from "../components/Navigation";

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
    const component = shallow(<Home />);

    it("should have a header", () => {
        expect(component.find("h1")).toBeTruthy();
        expect(component.find("h1")).toHaveLength(1);
        expect(
            component.contains(
                <h1>My First Little Next.js App...featuring Star Wars!</h1>
            )
        ).toBe(true);
    });

    it("should have a nav bar", () => {
        expect(component.find("Navigation")).toBeTruthy();
        expect(component.find("Navigation")).toHaveLength(1);
        expect(component.contains(<Navigation />)).toBe(true);
    });
});

// using react-test-renderer
describe("Home using create()", () => {
    const component = create(<Home />);

    it("should have a header", () => {
        const header = component.root.findByType("h1");
        expect(header).toBeTruthy();
        expect(header.type).toBe("h1");
        expect(header.props.children).toBe(
            "My First Little Next.js App...featuring Star Wars!"
        );
    });

    it("should have a nav bar", () => {
        const nav = component.root.findByType("nav");
        expect(nav).toBeTruthy();
        expect(nav.type).toBe("nav");
    });
});
