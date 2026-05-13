import test from "node:test";
import assert from "node:assert/strict";
import { classifyIntent, createConfirmationDraft, replyForMessage } from "../src/lib/agent";

test("classifies common domain messages", () => {
  assert.equal(classifyIntent("log my lunch meal"), "health");
  assert.equal(classifyIntent("I spent 200 on transport"), "finance");
  assert.equal(classifyIntent("remind me to drink water"), "reminder");
  assert.equal(classifyIntent("help me set a goal"), "goal");
  assert.equal(classifyIntent("hello"), "general");
});

test("write-like intents require confirmation drafts", () => {
  const draft = createConfirmationDraft("finance", "spent 260 on food");
  assert.equal(draft.requiresConfirmation, true);
  assert.equal(draft.action, "propose_finance_log");
});

test("general messages do not require write confirmation", () => {
  const draft = createConfirmationDraft("general", "what can you do");
  assert.equal(draft.requiresConfirmation, false);
  assert.equal(draft.action, "answer");
});

test("agent replies explain dummy mode and future confirmation behavior", () => {
  const reply = replyForMessage("log a meal with 40g protein");
  assert.match(reply.text, /Health mock/);
  assert.equal(reply.draft.requiresConfirmation, true);
});
