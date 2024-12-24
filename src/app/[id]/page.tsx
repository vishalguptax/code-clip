import axios from "axios";
import { Metadata } from "next";
import { CodeViewer } from "@/components/shared/CodeViewer";
import { redirect } from "next/navigation";

const getCode = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/codes/${id}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};

// Dynamically generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const code = await getCode(params.id);

  // Default app description from layout
  const defaultDescription =
    "Unlock the power of seamless code sharing with Code Clips. Create, and share your code in real time with developers around the world.";

  // Construct the metadata
  return {
    title: code?.title
      ? `${code.title} | Explore and Share Code Snippets - Code Clips`
      : "Code Clips | Explore and Share Code Snippets",
    description: defaultDescription, // Use the default app description
    openGraph: {
      title: code?.title
        ? `${code.title} | Explore and Share Code Snippets - Code Clips`
        : "Code Clips | Explore and Share Code Snippets",
      description: defaultDescription,
      url: `https://codeclips.vercel.app/code/${params.id}`, // Update with your app's base URL
      type: "website",
    },
    twitter: {
      title: code?.title
        ? `${code.title} | Explore and Share Code Snippets - Code Clips`
        : "Code Clips | Explore and Share Code Snippets",
      description: defaultDescription,
    },
  };
}

const Code = async ({ params }: { params: { id: string } }) => {
  const code = await getCode(params.id);

  if (!code?.code) {
    redirect("/?e=404");
  }

  return <CodeViewer code={code} />;
};

export default Code;
