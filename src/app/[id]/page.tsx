import { CodeViewer } from "@/components/shared/CodeViewer";
import axios from "axios";
import { redirect } from "next/navigation";

const getCode = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/codes/${id}`
    );
    console.log(data, "view page");
    return data;
  } catch (error) {
    return null;
  }
};

const Code = async ({ params }: { params: { id: string } }) => {
  const code = await getCode(params.id);

  if (!code?.code) {
    redirect("/");
  }

  return <CodeViewer code={code} />;
};

export default Code;
