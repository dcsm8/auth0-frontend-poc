"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const pageComponents = {
  page1: () => <div>This is Page 1 (Client-Side)</div>,
  page2: () => <div>This is Page 2 (Client-Side)</div>,
  page3: () => <div>This is Page 3 (Client-Side)</div>,
};

type PageKey = keyof typeof pageComponents;

export default function DynamicFlowPage() {
  const params = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [flowSteps, setFlowSteps] = useState<PageKey[]>([]);

  useEffect(() => {
    if (params.steps) {
      const steps = Array.isArray(params.steps) ? params.steps : [params.steps];
      setFlowSteps(
        steps.filter((step): step is PageKey => step in pageComponents)
      );
    }
  }, [params.steps]);

  const CurrentPageComponent = pageComponents[flowSteps[currentStep]];

  const goToNextStep = () => {
    if (currentStep < flowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/");
    }
  };

  if (!CurrentPageComponent) {
    return <div>404: Page not found</div>;
  }

  return (
    <div>
      <CurrentPageComponent />
      <button onClick={goToNextStep}>
        {currentStep < flowSteps.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}
