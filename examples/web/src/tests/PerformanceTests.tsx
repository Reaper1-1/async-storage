import { usePerformanceTest, useTestStorage } from "example-common-tests";
import React from "react";
import TestRunnerView from "../components/TestRunnerView";

type Props = {
  storageName: string | null;
};

const PerformanceTests: React.FC<Props> = ({ storageName }) => {
  const storage = useTestStorage(storageName);
  const runner = usePerformanceTest(storage);
  return <TestRunnerView runner={runner} />;
};

export default PerformanceTests;
