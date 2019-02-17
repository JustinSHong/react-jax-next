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
    const component = shallow(<Navigation />);

    it("should have a nav element", () => {
        expect(component.find("nav")).toHaveLength(1);
    });

    describe("Link elements", () => {
        it("should have 3 Link elements", () => {
            expect(component.find("Link")).toHaveLength(3);
        });

        it("should have 3 <a> elements", () => {
            expect(component.find("a")).toHaveLength(3);
        });

        it("should have a link to Home page", () => {
            expect(
                component
                    .find("nav")
                    .childAt(0)
                    .prop("href")
            ).toBe("/");
            expect(component.contains(<a>Home</a>));
        });

        it("should have a link to Characters page", () => {
            expect(
                component
                    .find("nav")
                    .childAt(1)
                    .prop("href")
            ).toBe("/characters");
            expect(component.contains(<a>Characters</a>));
        });

        it("should have a link to Planets page", () => {
            expect(
                component
                    .find("nav")
                    .childAt(2)
                    .prop("href")
            ).toBe("/planets");
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
            const home = links[0];

            expect(home.type).toBe("a");
            expect(home.props.href).toBe("/");
            expect(home.children[0]).toBe("Home");
        });

        it("should have a link to Characters page", () => {
            const characters = links[1];

            expect(characters.type).toBe("a");
            expect(characters.props.href).toBe("/characters");
            expect(characters.children[0]).toBe("Characters");
        });

        it("should have a link to Planets page", () => {
            const planets = links[2];

            expect(planets.type).toBe("a");
            expect(planets.props.href).toBe("/planets");
            expect(planets.children[0]).toBe("Planets");
        });
    });
});
