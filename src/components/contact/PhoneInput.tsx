"use client";

import { useLayoutEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { ControlProps } from "./Field";

const PREFIX = "+998 ";
const LOCAL_DIGITS = 9;

/** "901234567" → "+998 90 123 45 67"; partial input formats as far as it goes. */
function format(local: string) {
  const groups = [local.slice(0, 2), local.slice(2, 5), local.slice(5, 7), local.slice(7, 9)].filter(Boolean);
  return PREFIX + groups.join(" ");
}

/** The 9 local digits from whatever the field holds, including pasted "+998…" or "998…" numbers. */
function localDigits(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (raw.startsWith("+998") || (digits.startsWith("998") && digits.length > LOCAL_DIGITS)) digits = digits.slice(3);
  return digits.slice(0, LOCAL_DIGITS);
}

/** Index in `formatted` right after the n-th local digit, so the caret keeps its place while typing mid-number. */
function caretAfterDigits(formatted: string, n: number) {
  let seen = 0;
  for (let i = PREFIX.length; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === n) return i + 1;
  }
  return n === 0 ? PREFIX.length : formatted.length;
}

interface PhoneInputProps {
  control: ControlProps;
  name: string;
  className: string;
}

/** Uzbek phone field with a fixed "+998" prefix and "+998 90 123 45 67" grouping. */
export function PhoneInput({ control, name, className }: PhoneInputProps) {
  const [value, setValue] = useState(PREFIX);
  const input = useRef<HTMLInputElement>(null);
  const pendingCaret = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pendingCaret.current === null || !input.current) return;
    input.current.setSelectionRange(pendingCaret.current, pendingCaret.current);
    pendingCaret.current = null;
  }, [value]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    const caret = event.target.selectionStart ?? raw.length;
    // A deletion inside the prefix (virtual keyboards skip our keydown guard): keep the previous value.
    if (!raw.startsWith("+998") && raw.length < value.length && caret < PREFIX.length) {
      pendingCaret.current = PREFIX.length;
      setValue(value);
      return;
    }
    const next = format(localDigits(raw));
    // Digits typed before the caret, not counting the prefix's 998.
    const before = localDigits(raw.slice(0, caret)).length;
    pendingCaret.current = caretAfterDigits(next, before);
    setValue(next);
  }

  // The prefix is fixed: keep the caret out of it and stop Backspace from eating it.
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const { selectionStart, selectionEnd } = event.currentTarget;
    if (event.key === "Backspace" && selectionStart === selectionEnd && (selectionStart ?? 0) <= PREFIX.length) {
      event.preventDefault();
    }
  }

  function keepCaretAfterPrefix() {
    const el = input.current;
    if (el && (el.selectionStart ?? 0) < PREFIX.length) el.setSelectionRange(el.value.length, el.value.length);
  }

  return (
    <input
      {...control}
      ref={input}
      name={name}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      required
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={keepCaretAfterPrefix}
      onClick={keepCaretAfterPrefix}
      className={`${className} tabular-nums`}
    />
  );
}
