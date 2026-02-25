/**
 * meal-planner.test.js
 * SQA Workshop — Automated Testing with Jest + GitHub Actions
 *
 * Run locally with:  npm test
 * Or push to GitHub and watch Actions run it automatically.
 */

const fs   = require('fs');
const path = require('path');

beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
  document.open();
  document.write(html);
  document.close();
});

// ── Helpers ──────────────────────────────────────────────────

function click(id) {
  document.getElementById(id).click();
}

function check(id) {
  const el = document.getElementById(id);
  el.checked = true;
  el.dispatchEvent(new Event('change'));
}

function getMessage() {
  return document.getElementById('message').textContent;
}

function isPanelActive(panelId) {
  return document.getElementById(panelId).classList.contains('active');
}

// ─────────────────────────────────────────────────────────────
// These tests are correct and should all pass.
// ─────────────────────────────────────────────────────────────

describe('Tab navigation', () => {

  test('Starters tab is active by default', () => {
    expect(isPanelActive('panel-starters')).toBe(true);
  });

  test('clicking Mains tab shows the Mains panel', () => {
    click('tab-mains');
    expect(isPanelActive('panel-mains')).toBe(true);
  });

  test('clicking Mains tab hides the Starters panel', () => {
    click('tab-mains');
    expect(isPanelActive('panel-starters')).toBe(false);
  });

  test('clicking Desserts tab shows the Desserts panel', () => {
    click('tab-desserts');
    expect(isPanelActive('panel-desserts')).toBe(true);
  });

});

describe('Checkboxes', () => {

  test('all checkboxes are unchecked by default', () => {
    const allCheckboxes = [...document.querySelectorAll('input[type="checkbox"]')];
    expect(allCheckboxes.every(cb => cb.checked === false)).toBe(true);
  });

  test('checking Soup marks it as checked', () => {
    check('starter-soup');
    expect(document.getElementById('starter-soup').checked).toBe(true);
  });

  test('checking Pizza marks it as checked', () => {
    check('main-pizza');
    expect(document.getElementById('main-pizza').checked).toBe(true);
  });

});

describe('Generate button — basic validation', () => {

  test('clicking Generate with nothing selected shows an error', () => {
    click('generate-btn');
    expect(getMessage()).toContain('at least one item from each section');
  });

  test('selecting only a starter shows an error', () => {
    check('starter-soup');
    click('generate-btn');
    expect(getMessage()).toContain('at least one item from each section');
  });

  test('selecting only a main shows an error', () => {
    check('main-burger');
    click('generate-btn');
    expect(getMessage()).toContain('at least one item from each section');
  });

});

// ─────────────────────────────────────────────────────────────
// ISSUE #1 — this test fails because of a bug in index.html
// The app does not validate the Desserts tab correctly.
// Fix the bug in index.html so this test passes.
// ─────────────────────────────────────────────────────────────

describe('Generate button — desserts validation (Issue #1)', () => {

  test('selecting a starter and a main but no dessert shows an error', () => {
    check('starter-salad');
    check('main-burger');
    // desserts: nothing selected
    click('generate-btn');
    expect(getMessage()).toContain('at least one item from each section');
  });

});

// ─────────────────────────────────────────────────────────────
// ISSUE #2 — this test has a bug in the test code itself.
// It is testing the wrong thing. Fix the test so it is correct.
// Hint: read what the test name says, then check the expect().
// ─────────────────────────────────────────────────────────────

describe('Generate button — success message (Issue #2)', () => {

  test('selected items appear in the success message', () => {
    check('starter-bread');
    check('main-pizza');
    check('dessert-brownie');
    click('generate-btn');
    const msg = getMessage();
    // BUG: this checks the exact full string, but the app displays items
    // in a random order every time. So this test is flaky — it passes
    // sometimes and fails other times with no code changes.
    // Fix it so the test passes reliably regardless of item order.
    expect(msg).toContain('Garlic Bread');
    expect(msg).toContain('Pizza');
    expect(msg).toContain('Brownie');
  });

});

// ─────────────────────────────────────────────────────────────
// ISSUE #3 — write a new test here from scratch.
// Test that when multiple items are selected from the same tab,
// all of them appear in the success message.
// Steps:
//   - check starter-soup AND starter-salad (two starters)
//   - check main-steak
//   - check dessert-icecream
//   - click generate-btn
//   - expect getMessage() to contain 'Soup'
//   - expect getMessage() to contain 'Salad'
// ─────────────────────────────────────────────────────────────

describe('Generate button — multiple selections (Issue #3)', () => {

  test('multiple items from the same tab all appear in the message', () => {
    // Write your test here

  });

});
