import React from "react";
import styles from "./CategoryShowcase.module.css";

const CategoryShowcase = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styles.container} bg-gray-100 gap-2 m-6 p-4`}>
      {children}
    </div>
  );
};

export default CategoryShowcase;
