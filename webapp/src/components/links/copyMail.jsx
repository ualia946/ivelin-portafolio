import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

export default function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const email = "2004ivchoapostolov@gmail.com ";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return (
    <div className="m-6 flex items-center gap-3 ">
      <h1 className="text-lg font-medium">{email}</h1>
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 cursor-pointer font-bold rounded-md border-none  px-2 py-1 text-sm bg-primary hover:bg-secondary drop-shadow-[2px_2px_0_#0debd8]"
      >
        <FaRegCopy className="text-gray-300" />
        {copied ? "Copiado!" : "Copiar"}
      </button>
    </div>
  );
}
