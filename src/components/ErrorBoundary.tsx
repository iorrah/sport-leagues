import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in LeagueGrid:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-1 items-center justify-center py-20">
          <div className="w-full max-w-xl rounded-xl bg-white p-12 shadow-md">
            <div className="flex flex-col items-center text-center">
              {/* Icon container */}
              <div className="mb-8 flex h-24 w-20 items-center justify-center rounded-xl bg-muted/5">
                <AlertCircle className="h-14 w-14 text-destructive/60" strokeWidth={1} />
              </div>

              {/* Title */}
              <h2 className="mb-3 text-2xl font-semibold text-foreground">Something went wrong</h2>

              {/* Description */}
              <p className="max-w-md leading-7 text-muted-foreground">
                We encountered an unexpected error while displaying the interface. Try reloading the
                section or refresh the page.
              </p>

              {/* Action Button */}
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="mt-10 flex min-w-64 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-white transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <RefreshCcw className="h-5 w-5" />
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
