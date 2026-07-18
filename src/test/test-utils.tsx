import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { renderHook, RenderHookOptions, RenderHookResult } from "@testing-library/react";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithQueryClient = (ui: ReactNode, options?: Omit<RenderOptions, "wrapper">) => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient,
  };
};

export const renderHookWithQueryClient = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps, TResult>,
) => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return {
    ...renderHook(callback, { wrapper: Wrapper, ...options }),
    queryClient,
  } as RenderHookResult<TResult, TProps> & { queryClient: QueryClient };
};
