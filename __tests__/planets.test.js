import React from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";
// Components
import Planets from "../pages/planets";
import List from "../components/List";
import Navigation from "../components/Navigation";

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

const data = { results: [] };

describe("with snapshot", () => {
    it("renders correctly", () => {
        const component = create(<Planets data={data} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// using enzyme shallow method
describe("Planets using shallow()", () => {
    const component = shallow(<Planets data={data} />);

    it("should have a nav bar", () => {
        expect(component.contains(<Navigation />)).toBe(true);
    });

    it("should have a header", () => {
        expect(component.contains(<h1>Planets!</h1>)).toBe(true);
    });
});

// using react-test-renderer
describe("Planets using shallow()", () => {
    const component = create(<Planets data={data} />);

    it("should have a nav bar", () => {
        const nav = component.root.findByType("nav");

        expect(nav).toBeTruthy();
        expect(nav.type).toBe("nav");
    });

    it("should have a header", () => {
        const header = component.root.findByType("h1");

        expect(header).toBeTruthy();
        expect(header.type).toBe("h1");
        expect(header.props.children).toBe("Planets!");
    });
});