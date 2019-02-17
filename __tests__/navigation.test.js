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

    describe("Link elements", () => {
        const component = shallow(<Navigation />);

        it("should have 3 Link elements", () => {
            expect(component.find("Link")).toHaveLength(3);
        });

        it("should have 3 <a> elements", () => {
            expect(component.find("a")).toHaveLength(3);
        });

        it("should have a link to Home page", () => {
            expect(component.contains(<a>Home</a>));
        });

        it("should have a link to Characters page", () => {
            expect(component.contains(<a>Characters</a>));
        });

        it("should have a link to Planets page", () => {
            expect(component.contains(<a>Planets</a>));
        });
    });
});

describe("Navigation using create()", () => {
    it("should have a nav element", () => {
        const component = create(<Navigation />);
        const nav = component.root.findByType("nav");
        expect(nav).toBeTruthy();
    });

    describe("Link elements", () => {
        const component = create(<Navigation />);
        const links = component.toJSON().children;

        it("should have 3 Link elements", () => {
            expect(links).toHaveLength(3);
        });

        it("should have a link to Home page", () => {
            expect(links[0].type).toBe("a");
            expect(links[0].children[0]).toBe("Home");
        });

        it("should have a link to Characters page", () => {
            expect(links[1].type).toBe("a");
            expect(links[1].children[0]).toBe("Characters");
        });

        it("should have a link to Planets page", () => {
            expect(links[2].type).toBe("a");
            expect(links[2].children[0]).toBe("Planets");
        });
    });
});
