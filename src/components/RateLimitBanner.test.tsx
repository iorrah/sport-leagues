import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { RateLimitBanner } from "./RateLimitBanner";

describe("RateLimitBanner", () => {
  it("renders the rate limit banner with title and description", () => {
    renderWithQueryClient(<RateLimitBanner />);

    expect(screen.getByRole("heading", { name: /Rate limit reached/i })).toBeInTheDocument();
    expect(screen.getByText(/We've received too many requests/i)).toBeInTheDocument();
  });
});
