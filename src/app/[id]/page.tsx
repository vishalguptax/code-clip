import { CodeViewer } from "@/components/code-viewer";

import axios from "axios";
import { redirect } from "next/navigation";

const getCode = async (id: string) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/codes/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};

const Code = async ({ params }: { params: { id: string } }) => {
  const code = await getCode(params.id);

  if (!code?.id || !!!code?.code) {
    return redirect("/");
  }
  return <CodeViewer code={code} />;
};

export default Code;
