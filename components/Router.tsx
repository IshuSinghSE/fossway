'use client';
import * as React from "react";
import { useState } from "react";

interface RouterProps {
  children: React.ReactElement<NavigationProps> | React.ReactElement<NavigationProps>[];
}

export interface NavigationProps {
  currentPage: string;
  navigate: (page: string) => void;
}

export function Router({ children }: RouterProps) {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  // Clone children and pass navigation props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { currentPage, navigate });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
}