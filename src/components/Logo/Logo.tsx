import React from "react";

export function Logo({size = "medium"}: {size?: string}) {

  const logoSizeToFontSize: {[key: string]: string} = {
    big: "text-6xl",
    medium: "text-4xl",
    small: "text-2xl",
  };

  return (
    <div className="w-0 h-0 invisible md:visible md:w-fit md:h-fit flex flex-col justify-center items-center my-6">
      <p className={`mb-2 font-serif ${logoSizeToFontSize[size]}`}>MyWallet</p>
      <p className="text-md font-serif italic">Sua carteira digital</p>
    </div>
  );
}
