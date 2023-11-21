import { render, screen } from "@testing-library/react";
import CongratulationPage from "@/app/(root)/success/page";

describe("CongratulationPage", () => {
    it("should have Docs text", () => {
        render(<CongratulationPage />); // ARRANGE

        const myElem = screen.getByText(
            "Step into Style, Confirming Your Stride with Every Order!"
        ); // ACT

        expect(myElem).toBeInTheDocument(); // ASSERT
    });
});
