import React from "react";
import { useBasicTest, useTestStorage } from "example-common-tests";
import { TestRunnerView } from "../components/TestRunnerView";

type Props = {
  storageName: string | null;
};

const BasicTests: React.FC<Props> = ({ storageName }) => {
  const storage = useTestStorage(storageName);
  const basicTest = useBasicTest(storage);
  return <TestRunnerView runner={basicTest} />;
};

export default BasicTests;
