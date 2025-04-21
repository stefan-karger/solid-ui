import { Link, Meta, Title } from "@solidjs/meta";
import { mergeProps } from "solid-js";

const BASE_URL = "https://www.solid-ui.com";

export interface HeadProps {
  title?: string;
  description?: string;
}

export function MetaTags(rawProps: HeadProps) {
  const props = mergeProps(
    {
      description:
        "Beautifully designed components built with Kobalte and Tailwind CSS.",
      title: "solid-ui",
    },
    rawProps,
  );
  return (
    <>
      <Title>{props.title}</Title>

      <Meta charset="utf-8" />
      <Meta content="width=device-width, initial-scale=1" name="viewport" />

      <Meta content={props.title} name="title" />
      <Meta content={props.description} name="description" />
      <Meta
        content="shadcn,Solid,SolidJS,SolidStart,UI,Components,TailwindCSS,Kobalte"
        name="keywords"
      />
      <Meta content="Stefan E-K" name="author" />

      <Meta content="summary_large_image" name="twitter:card" />
      <Meta content={BASE_URL} name="twitter:site" />
      <Meta content={props.title} name="twitter:title" />
      <Meta content={props.description} name="twitter:description" />
      <Meta content={`${BASE_URL}/og.png`} name="twitter:image" />
      <Meta content={props.title} name="twitter:image:alt" />
      <Meta content="stefan_e_k" name="twitter:creator" />

      <Meta content={props.title} name="og:title" />
      <Meta content="article" name="og:type" />
      <Meta content={BASE_URL} name="og:url" />
      <Meta content={`${BASE_URL}/og.png`} name="og:image" />
      <Meta content={props.title} name="og:image:alt" />
      <Meta content="1200" name="og:image:width" />
      <Meta content="630" name="og:image:height" />

      <Link href={BASE_URL} rel="canonical" />
      <Link href={`${BASE_URL}/site.webmanifest`} rel="manifest" />
      <link
        href="/favicon-96x96.png"
        rel="icon"
        sizes="96x96"
        type="image/png"
      />
      <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon.ico" rel="shortcut icon" />

      <Link href="/apple-touch-icon.png" rel="apple-touch-icon" />
      <meta content={props.title} name="apple-mobile-web-app-title" />
    </>
  );
}
