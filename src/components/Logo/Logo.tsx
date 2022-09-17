import React from "react";

export function Logo({size = "medium"}: {size?: string}) {

  const logoSizeToFontSizeAndSpace: {[key: string]: string} = {
    big: "6",
    medium: "4",
    small: "2",
  };

  return (
    <div className="w-fit h-fit">
      <p className={`text-${logoSizeToFontSizeAndSpace[size]}xl font-serif my-${logoSizeToFontSizeAndSpace[size]}`}>MyWallet</p>
    </div>
  );
}
