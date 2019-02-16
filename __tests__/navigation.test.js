import React from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";
// Components
import Navigation from "../components/Navigation";

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

describe("with snapshot testing", () => {
    it("renders correctly", () => {
        const component = create(<Navigation />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Navigation using shallow()", () => {
    it("should have a nav element", () => {
        const component = shallow(<Navigation />);
        expect(component.find("nav")).toHaveLength(1);
    });

    it("should have 3 Link elements", () => {
        const component = shallow(<Navigation />);
        expect(component.find("Link")).toHaveLength(3);
    });

    it("should have 3 <a> elements", () => {
        const component = shallow(<Navigation />);
        expect(component.find("a")).toHaveLength(3);
    });

    it("should have a link to Home page", () => {
        const component = shallow(<Navigation />);
        expect(component.contains(<a>Home</a>));
    });

    it("should have a link to Characters page", () => {
        const component = shallow(<Navigation />);
        expect(component.contains(<a>Characters</a>));
    });

    it("should have a link to Planets page", () => {
        const component = shallow(<Navigation />);
        expect(component.contains(<a>Planets</a>));
    });
});
