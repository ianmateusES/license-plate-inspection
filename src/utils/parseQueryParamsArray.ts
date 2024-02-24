const parseQueryParamsArray = (element: string | undefined): string[] => {
  return element
    ? String(element)
        .split(',')
        .map(elem => elem.trim())
    : undefined;
};

export { parseQueryParamsArray };
