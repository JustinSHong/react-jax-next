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
