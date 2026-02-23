import React from "react";
import { usePerformanceTest, useTestStorage } from "example-common-tests";
import { TestRunnerView } from "../components/TestRunnerView";

type Props = {
  storageName: string | null;
};

const PerformanceTest: React.FC<Props> = ({ storageName }) => {
  const storage = useTestStorage(storageName);
  const basicTest = usePerformanceTest(storage);
  return <TestRunnerView runner={basicTest} />;
};

export default PerformanceTest;
