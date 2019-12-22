/**
 * This function is here for the sole
 * purpose of checking if strings are
 * empty or not. If they are, return true,
 * otherwise, return false.
 */
export default (s: String) => {
  let res = false;
  // Define a set of rules to check the string against.
  const ruleset = ["", " ", undefined, null];
  // Loop over the ruleset, checking if there are any matches.
  for (let i = 0; i < ruleset.length; i++) {
    const rule = ruleset[i];
    if (s === rule) res = true;
  }
  // Return the `res` variable.
  return res;
};
