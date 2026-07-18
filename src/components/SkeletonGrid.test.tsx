import { describe, expect, it } from "vitest";
import { renderWithQueryClient } from "../test/test-utils";
import { SkeletonGrid } from "./SkeletonGrid";

describe("SkeletonGrid", () => {
  it("renders the loading skeleton structure", () => {
    const { container } = renderWithQueryClient(<SkeletonGrid />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThanOrEqual(2);
  });
});
