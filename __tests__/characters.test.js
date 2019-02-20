import react from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";
// Components
import Characters from "../pages/characters";
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
        expect(component.find("nav")).toBeTruthy();
    });
});

// using react-test-renderer
describe("Characters using create()", () => {
    const component = create(<Characters data={data} />);

    it("should have a nav bar", () => {
        const nav = component.root.findByType("nav");
        expect(nav).toBeTruthy();
    });
});
