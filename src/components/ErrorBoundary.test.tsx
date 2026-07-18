import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { ErrorBoundary } from "./ErrorBoundary";
import { useState } from "react";

let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

const Bomb = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Boom");
  }

  return <div>Child content</div>;
};

describe("ErrorBoundary", () => {
  it("renders fallback UI when a child throws and recovers after retry", async () => {
    const Host = () => {
      const [shouldThrow, setShouldThrow] = useState(true);

      return (
        <>
          <button onClick={() => setShouldThrow(false)}>Reset</button>
          <ErrorBoundary>
            <Bomb shouldThrow={shouldThrow} />
          </ErrorBoundary>
        </>
      );
    };

    renderWithQueryClient(<Host />);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));
    fireEvent.click(screen.getByRole("button", { name: /Try again/i }));

    await waitFor(() => expect(screen.getByText("Child content")).toBeInTheDocument());
  });
});
