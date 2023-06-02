import { throttle } from "lodash";
import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config"; // Fix the path
import { KeyValuePair } from "tailwindcss/types/config";

const fullConfig = resolveConfig(tailwindConfig);

const getBreakpointValue = (value: string) => {
  const allScreens = fullConfig.theme?.screens as KeyValuePair<
    string,
    string | Screen | Screen[]
  >;

  if (!allScreens) return null;
  const breakpointString = allScreens[value] as string;

  return +breakpointString.slice(0, breakpointString.indexOf("px"));
};

const getCurrentBreakpoint = (width: number): string => {
  let currentBreakpoint: string = "DEFAULT";
  let biggestBreakpointValue = 0;

  const allScreens = fullConfig.theme?.screens;
  if (!allScreens) return "Import Error";

  for (const breakpoint of Object.keys(allScreens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (!breakpointValue) return "Breakpoint Error";
    if (breakpointValue > biggestBreakpointValue && width >= breakpointValue) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() =>
    getCurrentBreakpoint(
      typeof window !== "undefined" ? window.innerWidth : 1024
    )
  );

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBreakpoint(getCurrentBreakpoint(window.innerWidth));
    }, 200);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return breakpoint;
};
export default useBreakpoint;
