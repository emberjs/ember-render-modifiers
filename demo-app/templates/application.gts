import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { pageTitle } from 'ember-page-title';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import { didInsert, didUpdate, willDestroy } from '@ember/render-modifiers';

class DemoState {
  @tracked insertedElements: string[] = [];
  @tracked updateCount = 0;
  @tracked inputValue = '';
  @tracked destroyedElements: string[] = [];
  @tracked showDestroyable = true;
}

const state = new DemoState();

function onInsert(element: Element) {
  const id = element.getAttribute('data-id') ?? 'unknown';
  state.insertedElements = [...state.insertedElements, id];
}

function onUpdate(element: Element) {
  state.updateCount++;
  element.classList.add('highlight');
  setTimeout(() => element.classList.remove('highlight'), 600);
}

function onDestroy(element: Element) {
  const id = element.getAttribute('data-id') ?? 'unknown';
  state.destroyedElements = [...state.destroyedElements, id];
}

function updateInput(event: Event) {
  state.inputValue = (event.target as HTMLInputElement).value;
}

function toggleDestroyable() {
  state.showDestroyable = !state.showDestroyable;
}

<template>
  {{pageTitle "Demo App"}}

  <h1>ember-render-modifiers</h1>

  <section>
    <h2>didInsert</h2>
    <p>Elements call a function when inserted into the DOM.</p>
    <div {{didInsert onInsert}} data-id="box-1" class="demo-box">Box 1</div>
    <div {{didInsert onInsert}} data-id="box-2" class="demo-box">Box 2</div>
    <p class="log">
      Inserted:
      {{#each state.insertedElements as |id|}}
        <code>{{id}}</code>
      {{/each}}
    </p>
  </section>

  <section>
    <h2>didUpdate</h2>
    <p>The box highlights when the tracked value updates (not on initial
      render).</p>
    <label for="demo-input">Enter a value:</label>
    <input
      id="demo-input"
      type="text"
      placeholder="Type something…"
      value={{state.inputValue}}
      {{on "input" updateInput}}
    />
    <div {{didUpdate onUpdate state.inputValue}} class="demo-box">
      Value: "{{state.inputValue}}" — updated
      {{state.updateCount}}
      time(s)
    </div>
  </section>

  <section>
    <h2>willDestroy</h2>
    <p>Logs when an element is removed from the DOM.</p>
    <button type="button" {{on "click" toggleDestroyable}}>
      {{if state.showDestroyable "Remove" "Show"}}
      element
    </button>
    {{#if state.showDestroyable}}
      <div {{willDestroy onDestroy}} data-id="destroyable" class="demo-box">
        I will log when removed
      </div>
    {{/if}}
    <p class="log">
      Destroyed:
      {{#each state.destroyedElements as |id|}}
        <code>{{id}}</code>
      {{/each}}
    </p>
  </section>
</template>
