import react from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";
// Components
import Characters from "../pages/characters";
import Navigation from "../components/Navigation";
import List from "../components/List";

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
