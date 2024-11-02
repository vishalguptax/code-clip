import axios from "axios";
import { CodeViewer } from "@/components/shared/CodeViewer";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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

const Code = async ({ params }: { params: { id: string } }) => {
  const code = await getCode(params.id);

  if (!code?.code) {
    redirect("/?e=404");
  }

  return <CodeViewer code={code} />;
};

export default Code;
