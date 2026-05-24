/**
 * Minimal client-side router shim.
 *
 * This provides a subset of the react-router-dom v6 API sufficient for
 * Batch 0 routing (BrowserRouter, Routes, Route, Link, useLocation).
 *
 * When the npm registry is accessible, install `react-router-dom` and
 * update imports in src/app/AppRouter.tsx to use the real package.
 * Then delete this file.
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type ReactElement,
  type MouseEvent,
} from "react";

interface LocationState {
  pathname: string;
}

const RouterContext = createContext<{
  location: LocationState;
  navigate: (to: string) => void;
}>({
  location: { pathname: "/" },
  navigate: () => {},
});

export function useLocation(): LocationState {
  return useContext(RouterContext).location;
}

export function useNavigate(): (to: string) => void {
  return useContext(RouterContext).navigate;
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState>({
    pathname: window.location.pathname,
  });

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    setLocation({ pathname: to });
  }, []);

  useEffect(() => {
    const handlePop = () => {
      setLocation({ pathname: window.location.pathname });
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  return (
    <RouterContext.Provider value={{ location, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

interface RouteProps {
  path: string;
  element: ReactElement;
}

export function Route(_props: RouteProps): ReactElement | null {
  // Route is a config component; rendering is handled by Routes.
  return null;
}

export function Routes({ children }: { children: ReactNode }) {
  const { location } = useContext(RouterContext);
  const pathname = location.pathname;

  // Collect route configs from children
  const routes: RouteProps[] = [];
  const childArray = Array.isArray(children) ? children : [children];

  for (const child of childArray) {
    if (child && typeof child === "object" && "props" in child) {
      const props = (child as ReactElement<RouteProps>).props;
      if (props && typeof props.path === "string") {
        routes.push(props);
      }
    }
  }

  // Match exact path first
  for (const route of routes) {
    if (route.path === pathname) {
      return route.element;
    }
  }

  // Match wildcard fallback
  for (const route of routes) {
    if (route.path === "*") {
      return route.element;
    }
  }

  return null;
}

interface LinkProps {
  to: string;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Link({ to, children, style, className }: LinkProps) {
  const { navigate } = useContext(RouterContext);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} style={style} className={className}>
      {children}
    </a>
  );
}
