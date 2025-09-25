import { useEffect } from "react";

interface WindowWithReactDevtools extends Window {
  __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
    onCommitFiberRoot?: (...args: unknown[]) => unknown;
  };
}

export const useSuppressReactQuillWarnings = () => {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;

    // Override console.error to filter out findDOMNode warnings
    console.error = function (message: unknown, ...args: unknown[]) {
      // Check if the message contains findDOMNode warning
      if (
        typeof message === "string" &&
        message.includes("findDOMNode is deprecated")
      ) {
        return; // Suppress this warning
      }

      // Check if first argument is an object with message property (React warnings format)
      if (
        message &&
        typeof message === "object" &&
        message !== null &&
        "message" in message &&
        typeof message.message === "string" &&
        message.message.includes("findDOMNode is deprecated")
      ) {
        return; // Suppress this warning
      }

      // Pass through all other errors
      originalError.apply(console, [message, ...args]);
    };

    // Override console.warn similarly
    console.warn = function (message: unknown, ...args: unknown[]) {
      if (
        (typeof message === "string" &&
          message.includes("findDOMNode is deprecated")) ||
        (message &&
          typeof message === "object" &&
          message !== null &&
          "message" in message &&
          typeof message.message === "string" &&
          message.message.includes("findDOMNode is deprecated"))
      ) {
        return; // Suppress this warning
      }
      originalWarn.apply(console, [message, ...args]);
    };

    // Also try to intercept React's internal warning system
    const win = window as WindowWithReactDevtools;
    const originalReactWarn =
      win.__REACT_DEVTOOLS_GLOBAL_HOOK__?.onCommitFiberRoot;
    if (originalReactWarn && win.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      win.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function (
        ...args: unknown[]
      ) {
        try {
          return originalReactWarn.apply(this, args);
        } catch (error: unknown) {
          if (
            error &&
            typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof error.message === "string" &&
            error.message.includes("findDOMNode")
          ) {
            return; // Suppress
          }
          throw error;
        }
      };
    }

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      if (originalReactWarn && win.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        win.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot =
          originalReactWarn;
      }
    };
  }, []);
};
