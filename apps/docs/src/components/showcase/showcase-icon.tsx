type Props = {
  name: string
  class?: string
  "data-icon"?: string
}

export function ShowcaseIcon(props: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class={props.class}
      data-icon={props["data-icon"]}
    >
      <use href={`/showcase/icons.svg#${props.name}`} />
    </svg>
  )
}
