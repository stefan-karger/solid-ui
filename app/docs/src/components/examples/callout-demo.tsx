import { Callout, CalloutContent, CalloutTitle } from "~/../packages/core"

import { ComponentExample } from "~/components/component-example"

export function CalloutDemo() {
  return (
    <ComponentExample>
      <div class="flex flex-col space-y-4">
        <Callout>
          <CalloutTitle>Default</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
        <Callout variant={"success"}>
          <CalloutTitle>Success</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
        <Callout variant={"warning"}>
          <CalloutTitle>Warning</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
        <Callout variant={"error"}>
          <CalloutTitle>Error</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
      </div>
    </ComponentExample>
  )
}