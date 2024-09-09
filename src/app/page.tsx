import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Next.js 14 app router</h1>
      <h2>Choose a flow to test:</h2>
      <h3>Client-Side Flows:</h3>
      <div>
        <Link href="/flow/page1/page2/page3">
          <button>Flow 1: Page 1 -&gt; Page 2 -&gt; Page 3</button>
        </Link>
      </div>
      <div>
        <Link href="/flow/page2/page3">
          <button>Flow 2: Page 2 -&gt; Page 3</button>
        </Link>
      </div>
      <div>
        <Link href="/flow/page1/page3">
          <button>Flow 3: Page 1 -&gt; Page 3</button>
        </Link>
      </div>
      <h3>Server-Side Flows:</h3>
      <div>
        <Link href="/server-flow/page1/page2/page3">
          <button>Server Flow 1: Page 1 -&gt; Page 2 -&gt; Page 3</button>
        </Link>
      </div>
      <div>
        <Link href="/server-flow/page2/page3">
          <button>Server Flow 2: Page 2 -&gt; Page 3</button>
        </Link>
      </div>
      <div>
        <Link href="/server-flow/page1/page3">
          <button>Server Flow 3: Page 1 -&gt; Page 3</button>
        </Link>
      </div>
    </main>
  );
}
