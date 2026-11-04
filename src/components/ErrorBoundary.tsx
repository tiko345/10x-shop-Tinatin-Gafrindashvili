import { Component, type ErrorInfo, type ReactNode } from "react";

// children represents the components protected by this boundary
type ErrorBoundaryProps = {
    children: ReactNode;
};

// Track whether a child component has crashed
type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    // React calls this after a child throws an error during rendering
    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    // Record the error and component stack for debugging
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, info.componentStack);
    }

    render() {
        // Replace the crashed interface with a recovery message
        if (this.state.hasError) {
            return (
                <main className="mx-auto w-full max-w-xl px-4 py-16">
                    <div
                        role="alert"
                        className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center shadow-lg shadow-teal-900/10"
                    >
                        <h1 className="text-2xl font-bold text-slate-900">
                            Something went wrong.
                        </h1>

                        <p className="mt-3 text-slate-600">
                            Please reload the page to try again.
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-6 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                        >
                            Reload
                        </button>
                    </div>
                </main>
            );
        }

        // Render the protected components normally when there is no error
        return this.props.children;
    }
}

export default ErrorBoundary;