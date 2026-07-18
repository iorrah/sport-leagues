import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders the progressbar with the correct percentage", () => {
    renderWithQueryClient(<ProgressBar percentage={75} />);

    const progressbar = screen.getByRole("progressbar", { name: /Badge revealing progress/i });

    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
