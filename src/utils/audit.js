import axeCore from "axe-core";

export default async function auditWithAxe(element) {
  let options = {
    resultTypes: ["violations"],
  };

  let violations = [];
  let axeResults;

  try {
    axeResults = await axeCore.run(element, options);
  } catch ({ message }) {
    // eslint-disable-next-line no-console
    console.warn(`[react-accessibility] ${message}`);
    return violations;
  }

  if (axeResults.violations.length) {
    axeResults.violations.forEach((axeViolation) => {
      axeViolation.nodes.forEach((node) => {
        violations.push({
          ...axeViolation,
          node,
        });
      });
    });
  }

  return violations;
}
