import React, { useState, useEffect } from "react";
import auditWithAxe from "../../utils/audit";
import "./styles.scss";

const ReactAccessibility = (props) => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [violations, setViolations] = useState([]);

  const { position } = props;

  useEffect(() => {
    auditWithAxe(document.body).then((violations) => {
      setViolations(violations);
    });
  }, []);

  useEffect(() => {
    console.log(violations);
  }, [violations]);

  useEffect(() => {
    const padding = window
      .getComputedStyle(document.body, null)
      .getPropertyValue("padding-bottom")
      .replace("px", "");

    if (isAuditing) {
      document.body.style.paddingBottom = padding + 300 + "px";
    } else {
      document.body.style.paddingBottom = padding - 300 + "px";
    }
  }, [isAuditing]);

  const toggleAudit = () => {
    setIsAuditing((prev) => !prev);
  };

  const handleViolationClick = (violation) => {
    const target = violation.node.target[0];
    const element = document.querySelector(target);
    element.scrollIntoView();
  };

  return (
    <div
      className={`__a11y-audit__ ${isAuditing ? "auditing" : ""}`}
      style={position}
    >
      <button onClick={toggleAudit}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.9 122.9">
          <path d="M61.4 0A61.5 61.5 0 1 1 18 18 61.2 61.2 0 0 1 61.4 0ZM61 74.2l-8.9 24.7a5 5 0 0 1-2.6 2.8 5 5 0 0 1-6.8-6.2l6.2-17.3a26.3 26.3 0 0 0 1.2-4 40.6 40.6 0 0 0 .6-4.2l.5-7.9.3-7.3c0-2.6-.6-2.8-2.7-3.3h-.5l-18-3.4a5 5 0 0 1-3.2-2.1 5 5 0 0 1 5-7.7l19.4 3.6 2.3.2a57.6 57.6 0 0 0 7.2.6 81.1 81.1 0 0 0 8.9-.7l2.6-.3 18.3-3.4a5 5 0 0 1 3.7.7 5 5 0 0 1 1.3 7 5 5 0 0 1-3.2 2l-17.4 3.4-1.6.3c-1.8.3-2.7.4-2.6 3 0 2 .3 4.2.6 6.5a171.2 171.2 0 0 0 2.3 13l1.4 4.4 6 16.9a5 5 0 0 1-6.7 6.2A5 5 0 0 1 72 99l-9-24.7-1-1.8-1 1.8Zm.4-53.5a8.8 8.8 0 1 1-6.2 2.6 8.8 8.8 0 0 1 6.2-2.6ZM97.8 25a51.4 51.4 0 1 0 15 36.3 51.3 51.3 0 0 0-15-36.3Z" />
        </svg>
        {isAuditing ? (
          <strong className="violation-count">{violations.length}</strong>
        ) : null}
      </button>

      {isAuditing ? (
        <div className="violations">
          {violations.map((violation, index) => (
            <div
              key={index}
              className={`violation-card ${violation.impact}`}
              onClick={() => handleViolationClick(violation)}
            >
              <div className="violation-index">{index + 1}</div>
              <div className="violation-item">
                <div className="violation-header">
                  <strong>[{violation.impact}]</strong> {violation.help}
                </div>

                <div className="violation-description">
                  {violation.description}

                  <a
                    className="violation-help-url"
                    href={violation.helpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>

                <div>
                  {violation.node.all.length ? (
                    <div className="violation-fixes">
                      <strong>Fix all of the following:</strong>
                      <ul>
                        {violation.node.all.map((fix) => (
                          <li key={fix.id}>{fix.message}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}

                  {violation.node.any.length ? (
                    <div className="violation-fixes">
                      <strong>Fix any of the following:</strong>
                      <ul>
                        {violation.node.any.map((fix) => (
                          <li key={fix.id}>{fix.message}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ReactAccessibility;
