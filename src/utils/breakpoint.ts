import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config"; // Fix the path
import { KeyValuePair } from "tailwindcss/types/config";

const fullConfig = resolveConfig(tailwindConfig);

const allScreens = fullConfig.theme?.screens as KeyValuePair<
  string,
  string | Screen | Screen[]
>;

const breakpointList = ["DEFAULT", ...Object.keys(allScreens)];

export const breakpointToNumber = (breakpoint: string) =>
  breakpointList.indexOf(breakpoint);

export const compareBreakpoint = (a: string, b: string) => {
  const indexA = breakpointToNumber(a);
  const indexB = breakpointToNumber(b);
  return indexA > indexB ? 1 : indexA === indexB ? 0 : -1;
};

export const isMobile = (breakpoint: string) =>
  breakpointToNumber(breakpoint) <= breakpointToNumber("md");

export const breakpointDataMapper = (
  data: Partial<Record<string, any>>,
  breakpoint: string
) => {
  const smallerOrEqualBreakpoints = breakpointList.slice(
    0,
    breakpointToNumber(breakpoint) + 1
  );

  let resultData: any = null;

  smallerOrEqualBreakpoints.forEach((smallerBreakpoint) => {
    const breakpointData = data?.[smallerBreakpoint as string];
    if (breakpointData) resultData = breakpointData;
  });

  return resultData;
};
