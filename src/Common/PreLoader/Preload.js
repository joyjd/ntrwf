import React from "react";
import SkeletonContent from "react-native-skeleton-content";

const Preload = ({ children, isLoading, divArr }) => {
  return (
    <SkeletonContent containerStyle={{ flex: 1, width: "100%", backgroundColor: "#ff929226" }} isLoading={isLoading} boneColor='#FFCDD2' layout={divArr}>
      {children}
    </SkeletonContent>
  );

  /* return (
    <SkeletonContent
      containerStyle={{ flex: 1, width: "100%", backgroundColor: "#ff929226" }}
      isLoading={isLoading}
      boneColor='#FFCDD2'
      layout={[
        { key: "someId", width: 220, height: 20, marginBottom: 6 },
        { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
      ]}
    >
      {children}
    </SkeletonContent>
  ); */
};

export default Preload;
