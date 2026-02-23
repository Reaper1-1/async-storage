import { useBasicTest, useTestStorage } from "example-common-tests";
import React from "react";
import TestRunnerView from "../components/TestRunnerView";

type Props = {
  storageName: string | null;
};

const BasicTests: React.FC<Props> = ({ storageName }) => {
  const storage = useTestStorage(storageName);
  const runner = useBasicTest(storage);
  return <TestRunnerView runner={runner} />;
};

export default BasicTests;
