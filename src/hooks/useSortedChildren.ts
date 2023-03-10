import React, { useState, useEffect } from "react";

export function useSortedChildren<T>(
  children: T[],
  sorter: (a: T, b: T) => number,
  deps?: React.DependencyList
): T[] {
  const [sortedChildren, setSortedChildren] = useState<T[]>([]);

  useEffect(() => {
    const sorted = children.sort(sorter);
    setSortedChildren(sorted);
  }, [deps]);

  return sortedChildren;
}
