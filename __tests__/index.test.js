import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Home from "../pages/index.js";

describe("with snapshot testing", () => {
    it("Home matches previous snapshot", () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        console.log(tree);
        expect(tree).toMatchSnapshot();
    });
});
