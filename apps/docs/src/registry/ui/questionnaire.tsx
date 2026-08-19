import { Check } from "lucide-solid";
import type { JSX } from "solid-js";
import { createEffect, createUniqueId, onCleanup, splitProps } from "solid-js";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/registry/ui/button";
import {
  QuestionnaireChoiceContext,
  QuestionnaireContext,
  QuestionnaireItemContext,
  useQuestionnaireChoiceContext,
  useQuestionnaireContext,
  useQuestionnaireItemContext,
  createQuestionnaireChoice,
  createQuestionnaireInput,
  createQuestionnaireItem,
  createQuestionnaireRoot,
} from "~/registry/hooks/use-questionnaire";
import type {
  QuestionnaireActionsProps,
  QuestionnaireChoiceDescriptionProps,
  QuestionnaireChoiceInputProps,
  QuestionnaireChoiceLabelProps,
  QuestionnaireChoiceProps,
  QuestionnaireChoiceShortcutProps,
  QuestionnaireChoicesProps,
  QuestionnaireDescriptionProps,
  QuestionnaireErrorProps,
  QuestionnaireInputProps,
  QuestionnaireItemProps,
  QuestionnaireNavigationProps,
  QuestionnaireNextProps,
  QuestionnairePreviousProps,
  QuestionnaireProgressProps,
  QuestionnaireRootProps,
  QuestionnaireSkipProps,
  QuestionnaireSubmitProps,
  QuestionnaireTitleProps,
} from "~/registry/hooks/use-questionnaire";

const QuestionnaireRoot = (props: QuestionnaireRootProps) => {
  const [local, others] = splitProps(props, [
    "children",
    "class",
    "defaultItem",
    "item",
    "items",
    "noValidate",
    "onItemChange",
    "onKeyDown",
    "onReset",
    "onSubmit",
    "ref",
    "shortcuts",
  ]);

  const { context, rootProps } = createQuestionnaireRoot(local);

  return (
    <QuestionnaireContext.Provider value={context}>
      <form
        data-slot="questionnaire"
        data-current={context.current}
        data-first={context.first ? "" : undefined}
        data-last={context.last ? "" : undefined}
        data-shortcuts={local.shortcuts}
        data-total={context.total}
        class={cn("cn-questionnaire flex w-full min-w-0 flex-col", local.class)}
        noValidate={local.noValidate ?? true}
        {...rootProps}
        {...others}
      >
        {local.children}
      </form>
    </QuestionnaireContext.Provider>
  );
};

const QuestionnaireProgress = (props: QuestionnaireProgressProps) => {
  const context = useQuestionnaireContext("QuestionnaireProgress");
  const [local, others] = splitProps(props, ["children", "class"]);
  const label = () =>
    context.total
      ? `Question ${context.current} of ${context.total}`
      : undefined;
  const content = () => {
    const children = local.children;

    if (typeof children === "function") {
      return children({
        current: context.current,
        first: context.first,
        last: context.last,
        total: context.total,
      });
    }

    return children ?? label();
  };

  return (
    <div
      data-slot="questionnaire-progress"
      role="progressbar"
      aria-label="Questionnaire progress"
      aria-live="polite"
      aria-valuemax={context.total || undefined}
      aria-valuemin={context.total ? 1 : undefined}
      aria-valuenow={context.total ? context.current : undefined}
      aria-valuetext={label()}
      data-current={context.current}
      data-first={context.first ? "" : undefined}
      data-last={context.last ? "" : undefined}
      data-total={context.total}
      class={cn(
        "cn-questionnaire-progress min-h-lh w-fit min-w-[14ch] font-medium text-left text-muted-foreground tabular-nums",
        local.class,
      )}
      {...others}
    >
      {content()}
    </div>
  );
};

const QuestionnaireItem = (props: QuestionnaireItemProps) => {
  const [local, others] = splitProps(props, [
    "aria-describedby",
    "aria-keyshortcuts",
    "children",
    "class",
    "disabled",
    "invalid",
    "multiple",
    "name",
    "onStatusChange",
    "ref",
    "required",
  ]);

  const { context, itemProps, state } = createQuestionnaireItem(local);

  return (
    <QuestionnaireItemContext.Provider value={context}>
      <fieldset
        data-slot="questionnaire-item"
        data-active={state.active ? "" : undefined}
        data-disabled={state.disabled ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        data-multiple={state.multiple ? "" : undefined}
        data-required={state.required ? "" : undefined}
        data-status={state.status}
        class={cn(
          "cn-questionnaire-item min-w-0 border-0 p-0 outline-none",
          local.class,
        )}
        {...itemProps}
        {...others}
      >
        {local.children}
      </fieldset>
    </QuestionnaireItemContext.Provider>
  );
};

const QuestionnaireTitle = (props: QuestionnaireTitleProps) => {
  useQuestionnaireItemContext("QuestionnaireTitle");
  const [local, others] = splitProps(props, ["class"]);

  return (
    <legend
      data-slot="questionnaire-title"
      class={cn(
        "z-font-heading cn-questionnaire-title text-left text-pretty",
        local.class,
      )}
      {...others}
    />
  );
};

const QuestionnaireDescription = (props: QuestionnaireDescriptionProps) => {
  const itemContext = useQuestionnaireItemContext("QuestionnaireDescription");
  const [local, others] = splitProps(props, ["class", "id"]);
  const generatedId = createUniqueId();
  const descriptionId = () => local.id ?? generatedId;

  createEffect(() => {
    onCleanup(itemContext.registerDescription(descriptionId()));
  });

  return (
    <p
      data-slot="questionnaire-description"
      id={descriptionId()}
      class={cn(
        "cn-questionnaire-description text-left text-pretty text-muted-foreground",
        local.class,
      )}
      {...others}
    />
  );
};

const QuestionnaireChoices = (props: QuestionnaireChoicesProps) => {
  const itemContext = useQuestionnaireItemContext("QuestionnaireChoices");
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="questionnaire-choices"
      data-shortcuts={itemContext.shortcuts ?? undefined}
      class={cn(
        "group/questionnaire-choices cn-questionnaire-choices grid min-w-0",
        local.class,
      )}
      {...others}
    />
  );
};

const QuestionnaireChoice = (props: QuestionnaireChoiceProps) => {
  const [local, others] = splitProps(props, [
    "checked",
    "children",
    "class",
    "defaultChecked",
    "disabled",
    "onChange",
    "value",
  ]);

  const choiceContext = createQuestionnaireChoice(local);
  const state = choiceContext.state;

  return (
    <QuestionnaireChoiceContext.Provider value={choiceContext}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: QuestionnaireChoiceInput renders the native input inside the label. */}
      <label
        data-slot="questionnaire-choice"
        data-checked={state.checked ? "" : undefined}
        data-unchecked={state.checked ? undefined : ""}
        data-disabled={state.disabled ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        data-shortcut={state.shortcut ?? undefined}
        data-type={state.type}
        class={cn(
          "group/questionnaire-choice relative cn-questionnaire-choice flex min-h-11 cursor-pointer select-none items-start text-start outline-none transition-colors",
          "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
          local.class,
        )}
        {...others}
      >
        <QuestionnaireChoiceInput />
        <span
          aria-hidden="true"
          data-slot="questionnaire-choice-indicator"
          class="pointer-events-none relative cn-questionnaire-choice-indicator flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full"
        >
          <span
            data-slot="questionnaire-choice-indicator-dot"
            class="cn-questionnaire-choice-indicator-dot hidden rounded-full group-data-checked/questionnaire-choice:block group-data-[type=checkbox]/questionnaire-choice:hidden"
          />
          <Check
            data-slot="questionnaire-choice-indicator-check"
            class="cn-questionnaire-choice-indicator-check hidden group-data-checked/questionnaire-choice:block group-data-[type=radio]/questionnaire-choice:hidden"
          />
        </span>
        <QuestionnaireChoiceLabel>{local.children}</QuestionnaireChoiceLabel>
        <QuestionnaireChoiceShortcut />
      </label>
    </QuestionnaireChoiceContext.Provider>
  );
};

const QuestionnaireChoiceInput = (props: QuestionnaireChoiceInputProps) => {
  const choiceContext = useQuestionnaireChoiceContext(
    "QuestionnaireChoiceInput",
  );
  const [local, others] = splitProps(props, ["class", "ref"]);
  const [inputRef, inputProps] = splitProps(choiceContext.inputProps, ["ref"]);
  const state = choiceContext.state;

  return (
    <input
      data-slot="questionnaire-choice-input"
      data-checked={state.checked ? "" : undefined}
      data-unchecked={state.checked ? undefined : ""}
      data-disabled={state.disabled ? "" : undefined}
      data-invalid={state.invalid ? "" : undefined}
      data-shortcut={state.shortcut ?? undefined}
      data-type={state.type}
      class={cn(
        "absolute inset-0 z-10 cn-questionnaire-choice-input size-full cursor-pointer opacity-0",
        local.class,
      )}
      {...inputProps}
      {...others}
      ref={(element) => {
        inputRef.ref(element);
        local.ref?.(element);
      }}
    />
  );
};

const QuestionnaireChoiceLabel = (props: QuestionnaireChoiceLabelProps) => {
  useQuestionnaireChoiceContext("QuestionnaireChoiceLabel");
  const [local, others] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="questionnaire-choice-label"
      class={cn(
        "cn-questionnaire-choice-content cn-questionnaire-choice-label flex min-w-0 flex-1 flex-col leading-snug",
        local.class,
      )}
      {...others}
    />
  );
};

const QuestionnaireChoiceShortcut = (
  props: QuestionnaireChoiceShortcutProps,
) => {
  const choiceContext = useQuestionnaireChoiceContext(
    "QuestionnaireChoiceShortcut",
  );
  const [local, others] = splitProps(props, ["children", "class"]);

  return (
    <span
      aria-hidden="true"
      data-slot="questionnaire-choice-shortcut"
      data-shortcut={choiceContext.state.shortcut ?? undefined}
      hidden={choiceContext.state.shortcut === null}
      class={cn(
        "pointer-events-none cn-questionnaire-choice-shortcut cn-questionnaire-shortcut ms-auto hidden shrink-0 group-data-shortcut/questionnaire-choice:inline-flex",
        local.class,
      )}
      {...others}
    >
      {local.children ?? choiceContext.state.shortcut}
    </span>
  );
};

const QuestionnaireChoiceDescription = (
  props: QuestionnaireChoiceDescriptionProps,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <span
      data-slot="questionnaire-choice-description"
      class={cn("cn-questionnaire-choice-description", local.class)}
      {...others}
    />
  );
};

const QuestionnaireInput = (props: QuestionnaireInputProps) => {
  const [local, others] = splitProps(props, [
    "class",
    "defaultValue",
    "disabled",
    "onInput",
    "ref",
    "type",
    "value",
  ]);

  const { inputProps, state } = createQuestionnaireInput(local);

  return (
    <div
      data-slot="questionnaire-input-wrapper"
      class="group/questionnaire-input relative cn-questionnaire-input-wrapper min-w-0"
    >
      <input
        data-slot="questionnaire-input"
        data-disabled={state.disabled ? "" : undefined}
        data-empty={state.filled ? undefined : ""}
        data-filled={state.filled ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        class={cn(
          "cn-questionnaire-input min-h-11 w-full min-w-0 outline-none transition-[color,box-shadow,background-color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0",
          "selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground",
          local.class,
        )}
        {...inputProps}
        {...others}
      />
    </div>
  );
};

const QuestionnaireError = (props: QuestionnaireErrorProps) => {
  const itemContext = useQuestionnaireItemContext("QuestionnaireError");
  const [local, others] = splitProps(props, ["children", "class", "id"]);
  const generatedId = createUniqueId();
  const errorId = () => local.id ?? generatedId;

  createEffect(() => {
    onCleanup(itemContext.registerError(errorId()));
  });

  return (
    <p
      data-slot="questionnaire-error"
      data-invalid={itemContext.invalid ? "" : undefined}
      hidden={!itemContext.invalid}
      id={errorId()}
      role={itemContext.invalid ? "alert" : undefined}
      class={cn("cn-questionnaire-error text-destructive", local.class)}
      {...others}
    >
      {local.children ??
        (itemContext.required
          ? "Choose an answer to continue."
          : "Choose an answer or skip this question.")}
    </p>
  );
};

const QuestionnaireActions = (props: QuestionnaireActionsProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="questionnaire-actions"
      class={cn(
        "cn-questionnaire-actions grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center",
        local.class,
      )}
      {...others}
    />
  );
};

type QuestionnaireNavigationButtonProps = QuestionnaireNavigationProps & {
  defaultChildren: string;
  navigationClass: string;
  shortcut?: "Enter";
  slotName: string;
  visible: boolean;
};

const QuestionnaireNavigationButton = (
  props: QuestionnaireNavigationButtonProps,
) => {
  const context = useQuestionnaireContext("QuestionnaireNavigationButton");
  const [local, others] = splitProps(props, [
    "children",
    "class",
    "defaultChildren",
    "disabled",
    "navigationClass",
    "shortcut",
    "size",
    "slotName",
    "tabIndex",
    "type",
    "variant",
    "visible",
  ]);

  const disabled = () => local.disabled ?? false;
  const activeShortcut = () =>
    local.visible && !disabled() ? (local.shortcut ?? null) : null;

  return (
    <button
      data-slot={local.slotName}
      data-size={local.size ?? "default"}
      data-variant={local.variant ?? "default"}
      aria-hidden={!local.visible || undefined}
      aria-keyshortcuts={activeShortcut() ?? undefined}
      data-disabled={disabled() ? "" : undefined}
      data-shortcut={activeShortcut() ?? undefined}
      data-status={context.activeItemStatus ?? undefined}
      data-visible={local.visible ? "" : undefined}
      data-hidden={local.visible ? undefined : ""}
      disabled={disabled()}
      hidden={!local.visible}
      inert={!local.visible}
      tabIndex={local.visible ? local.tabIndex : -1}
      type={local.type ?? "button"}
      class={cn(
        buttonVariants({
          size: local.size ?? "default",
          variant: local.variant ?? "default",
        }),
        local.navigationClass,
        local.class,
      )}
      {...others}
    >
      {local.children ?? local.defaultChildren}
    </button>
  );
};

const QuestionnairePrevious = (props: QuestionnairePreviousProps) => {
  const context = useQuestionnaireContext("QuestionnairePrevious");
  const [local, others] = splitProps(props, ["onClick", "variant"]);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    if (typeof local.onClick === "function") {
      local.onClick(event);
    }

    if (!event.defaultPrevented) {
      context.goPrevious();
    }
  };

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Previous"
      navigationClass="cn-questionnaire-previous col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0"
      onClick={handleClick}
      slotName="questionnaire-previous"
      variant={local.variant ?? "outline"}
      visible={context.total > 1 && !context.first}
      {...others}
    />
  );
};

const QuestionnaireSkip = (props: QuestionnaireSkipProps) => {
  const context = useQuestionnaireContext("QuestionnaireSkip");
  const [local, others] = splitProps(props, ["onClick", "variant"]);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    if (typeof local.onClick === "function") {
      local.onClick(event);
    }

    if (!event.defaultPrevented) {
      context.skipCurrent();
    }
  };

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Skip"
      navigationClass="cn-questionnaire-skip col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0"
      onClick={handleClick}
      slotName="questionnaire-skip"
      variant={local.variant ?? "outline"}
      visible={context.activeItemRequired === false}
      {...others}
    />
  );
};

const QuestionnaireNext = (props: QuestionnaireNextProps) => {
  const context = useQuestionnaireContext("QuestionnaireNext");
  const [local, others] = splitProps(props, ["onClick"]);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    if (typeof local.onClick === "function") {
      local.onClick(event);
    }

    if (!event.defaultPrevented) {
      context.goNext();
    }
  };

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Next"
      navigationClass="cn-questionnaire-next col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0"
      onClick={handleClick}
      shortcut="Enter"
      slotName="questionnaire-next"
      visible={context.total > 1 && !context.last}
      {...others}
    />
  );
};

const QuestionnaireSubmit = (props: QuestionnaireSubmitProps) => {
  const context = useQuestionnaireContext("QuestionnaireSubmit");
  const [local, others] = splitProps(props, ["type"]);

  return (
    <QuestionnaireNavigationButton
      defaultChildren="Submit"
      navigationClass="cn-questionnaire-submit col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0"
      shortcut="Enter"
      slotName="questionnaire-submit"
      type={local.type ?? "submit"}
      visible={context.total > 0 && context.last}
      {...others}
    />
  );
};

export {
  QuestionnaireRoot,
  QuestionnaireProgress,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireInput,
  QuestionnaireError,
  QuestionnaireActions,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireNext,
  QuestionnaireSubmit,
  QuestionnaireChoiceInput,
  QuestionnaireChoiceLabel,
  QuestionnaireChoiceShortcut,
}
