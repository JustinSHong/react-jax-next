import React from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";
// Components
import Characters from "../pages/characters";
import Navigation from "../components/Navigation";

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

const data = { results: [] };

describe("with snapshot testing", () => {
    it("renders correctly", () => {
        const component = create(<Characters data={data} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("async/await", () => {
    it("works with async/await", async () => {
        const req = { req: {} };
        const props = await Characters.getInitialProps(req);
        const wrapper = shallow(<Characters {...props} />);
        const results = wrapper.instance().props.data.results;

        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBe(10);
        expect(results[0]).toEqual({
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            hair_color: "blond",
            skin_color: "fair",
            eye_color: "blue",
            birth_year: "19BBY",
            gender: "male",
            homeworld: "https://swapi.co/api/planets/1/",
            films: [
                "https://swapi.co/api/films/2/",
                "https://swapi.co/api/films/6/",
                "https://swapi.co/api/films/3/",
                "https://swapi.co/api/films/1/",
                "https://swapi.co/api/films/7/"
            ],
            species: ["https://swapi.co/api/species/1/"],
            vehicles: [
                "https://swapi.co/api/vehicles/14/",
                "https://swapi.co/api/vehicles/30/"
            ],
            starships: [
                "https://swapi.co/api/starships/12/",
                "https://swapi.co/api/starships/22/"
            ],
            created: "2014-12-09T13:50:51.644000Z",
            edited: "2014-12-20T21:17:56.891000Z",
            url: "https://swapi.co/api/people/1/"
        });
    });
});

// using enzyme shallow method
describe("Characters using shallow()", () => {
    const component = shallow(<Characters data={data} />);

    it("should have a nav bar", () => {
        expect(component.find("Navigation")).toBeTruthy();
        expect(component.find("Navigation")).toHaveLength(1);
        expect(component.contains(<Navigation />)).toBe(true);
    });

    it("should have a header", () => {
        expect(component.find("h1")).toBeTruthy();
        expect(component.find("h1")).toHaveLength(1);
        expect(component.contains(<h1>Characters!</h1>)).toBe(true);
    });

    it("should have className container", () => {
        expect(component.exists(".container")).toBe(true);
        expect(component.find(".container")).toHaveLength(1);
    });
});

// using react-test-renderer
describe("Characters using create()", () => {
    const component = create(<Characters data={data} />);

    it("should have a nav bar", () => {
        const nav = component.root.findByType("nav");
        expect(nav).toBeTruthy();
        expect(nav.type).toBe("nav");
    });

    it("should have a header", () => {
        const header = component.root.findByType("h1");
        expect(header).toBeTruthy();
        expect(header.type).toBe("h1");
        expect(header.props.children).toBe("Characters!");
    });

    it("should have className container", () => {
        const container = component.root.findAllByType("div");
        expect(container[1].props.className).toBeTruthy();
        expect(container[1].props.className).toBe("jsx-2681821622 container");
    });
});
