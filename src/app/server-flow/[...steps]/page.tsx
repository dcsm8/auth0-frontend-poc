import { notFound } from "next/navigation";
import Link from "next/link";

const pageComponents = {
  page1: () => <div>This is Page 1 (Server-Side)</div>,
  page2: () => <div>This is Page 2 (Server-Side)</div>,
  page3: () => <div>This is Page 3 (Server-Side)</div>,
};

type PageKey = keyof typeof pageComponents;

async function getFlowData(steps: string[]) {
  return steps.filter((step): step is PageKey => step in pageComponents);
}

export default async function ServerDynamicFlowPage({
  params,
}: {
  params: { steps: string[] };
}) {
  const flowSteps = await getFlowData(params.steps);

  if (flowSteps.length === 0) {
    notFound();
  }

  const CurrentPageComponent = pageComponents[flowSteps[0]];

  return (
    <div>
      <CurrentPageComponent />
      {flowSteps.length > 1 ? (
        <Link href={`/server-flow/${flowSteps.slice(1).join("/")}`}>
          <button>Next</button>
        </Link>
      ) : (
        <Link href="/">
          <button>Finish</button>
        </Link>
      )}
    </div>
  );
}
