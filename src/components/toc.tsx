import { useLocation } from "@solidjs/router";
import type { Accessor, Setter } from "solid-js";
import {
  createEffect,
  createSignal,
  For,
  on,
  onCleanup,
  Suspense,
} from "solid-js";
import { isServer } from "solid-js/web";

import { cn } from "~/lib/utils";

type TocItem = {
  depth: number;
  text: string;
  slug: string;
};

function updateHeadings(setter: Setter<TocItem[]>) {
  if (document.getElementsByTagName("article").length === 0) {
    setTimeout(() => updateHeadings(setter), 1);
    return;
  }

  setter(
    [
      ...document
        .getElementsByTagName("article")[0]
        .querySelectorAll(
          "h1[data-toc], h2[data-toc], h3[data-toc], h4[data-toc], h5[data-toc], h6[data-toc]",
        ),
    ].map((element) => ({
      depth: Number(element.tagName.substring(1)),
      slug: element.id,
      text: element.textContent!,
    })),
  );
}

function getHeadingsFromToc(tableOfContents: TocItem[]) {
  return tableOfContents.map(({ slug }) => {
    const el = document.getElementById(slug);

    if (!el) {
      return;
    }

    const style = window.getComputedStyle(el);
    const scrollMt = parseFloat(style.scrollMarginTop) + 1;
    const puffer = 50;

    const top =
      window.scrollY + el.getBoundingClientRect().top - scrollMt - puffer;

    return { slug, top };
  });
}

function useCurrentSection(tableOfContents: Accessor<TocItem[] | undefined>) {
  const [currentSection, setCurrentSection] = createSignal(
    tableOfContents()?.[0]?.slug,
  );

  createEffect(() => {
    const toc = tableOfContents();

    if (toc == null || toc.length === 0) {
      return;
    }

    const headings = getHeadingsFromToc(toc);

    function onScroll() {
      const top = window.scrollY;
      let current = headings[0]?.slug;

      for (const heading of headings) {
        if (heading == null) {
          continue;
        }

        if (top >= heading.top) {
          current = heading.slug;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    onCleanup(() => {
      // @ts-expect-error because reasons
      window.removeEventListener("scroll", onScroll, { passive: true });
    });
  });

  return currentSection;
}

export function TableOfContents() {
  const location = useLocation();

  const [toc, setToc] = createSignal<TocItem[]>([]);
  createEffect(
    on(
      () => location.pathname,
      () => {
        if (isServer) return;
        updateHeadings(setToc);
      },
    ),
  );

  const currentSection = useCurrentSection(toc);

  createEffect(
    on(
      () => currentSection(),
      (currentSection) => {
        if (isServer) return;

        const element = document.querySelector(
          `a[data-toc-slug="${currentSection}"]`,
        );

        element?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      },
    ),
  );

  return (
    <aside class="sticky top-24">
      <nav aria-labelledby="on-this-page-title">
        <Suspense>
          <h2 class="font-medium" id="on-this-page-title">
            On This Page
          </h2>
          <ul class="m-0 list-none">
            <For each={toc()}>
              {(section) => (
                <li class={cn("mt-0 pt-2", section.depth === 3 && "pl-4")}>
                  <a
                    class={cn(
                      "inline-block text-muted-foreground no-underline transition-colors hover:text-foreground",
                      section.slug === currentSection()
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                    data-toc-slug={section.slug}
                    href={`${location.pathname}#${section.slug}`}
                  >
                    {section.text}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </Suspense>
      </nav>
    </aside>
  );
}
