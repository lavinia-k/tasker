/* eslint-disable import/prefer-default-export */

// Utility function for mocking pauses between events/lifecycles
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
