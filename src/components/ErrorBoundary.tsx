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
        console.error(
            "Error caught by ErrorBoundary:",
            error,
            info.componentStack
        );
    }

    render() {
        // Replace the crashed interface with a recovery message
        if (this.state.hasError) {
            return (
                <main className="mx-auto w-full max-w-xl px-4 py-16">
                    {/* Read the theme through CSS without depending on Context */}
                    <div
                        role="alert"
                        className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center shadow-lg shadow-teal-900/10 dark:border-teal-800 dark:bg-[#14332e] dark:text-slate-100 dark:shadow-black/20"
                    >
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Something went wrong.
                        </h1>

                        <p className="mt-3 text-slate-600 dark:text-slate-300">
                            Please reload the page to try again.
                        </p>

                        {/* Reload the application to attempt recovery */}
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-6 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-400"
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