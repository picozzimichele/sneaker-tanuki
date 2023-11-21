import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/(root)/page";

describe("Profile Page", () => {
    it("should render the profile page", () => {
        render(<Home />);
        expect(screen.getByText("Welcome back,")).toBeInTheDocument();
    });
});
