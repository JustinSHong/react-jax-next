import React from "react";
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Router from "next/router";
// Components
import Planet from "../pages/planets";
import List from "../components/List";

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

const data = { results: [] };

describe("with snapshot", () => {
    it("renders correctly", () => {
        const component = create(<Planet data={data} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
