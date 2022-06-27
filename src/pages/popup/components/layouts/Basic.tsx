import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const BasicLayout = ({
  title,
  children,
}: PropsWithChildren<{
  title: string;
}>) => {
  return (
    <div className="flex flex-col gap-5 mb-10">
      <h1 className="font-semibold text-2xl">{title}</h1>
      <div>{children}</div>
      <Link className="underline" to="/app">
        &lt; Back
      </Link>
    </div>
  );
};

export default BasicLayout;
