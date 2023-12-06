import jsPDF from "jspdf";
import StateStreetBackground from "../assets/images/state-street-background.jpg";
import StateStreetLogo from "../assets/images/state-street.png";

/**
 * Generates a PDF report based on the provided compliance data.
 *
 * @param {Array} complianceData - The compliance data used to generate the report.
 * @returns {Object} - The generated PDF document.
 */
const GeneratePDFReport = (complianceData) => {
  const doc = new jsPDF();

  doc.addImage(
    StateStreetBackground,
    "JPG",
    0,
    0,
    doc.internal.pageSize.width,
    doc.internal.pageSize.height
  );

  const logoWidth = 80; // Adjust the width of the logo as needed
  const logoHeight = 25; // Adjust the height of the logo as needed
  doc.addImage(StateStreetLogo, "PNG", 20, 20, logoWidth, logoHeight);

  // Title and Subtitle
  doc.setFontSize(32);
  doc.text("State Street Compliance Report", 20, 70);
  doc.setFontSize(18);
  doc.text("Generated on: " + new Date().toLocaleString(), 20, 85);
  doc.addPage();

  let yPosition = 20;
  const maxPageHeight = 270;

  const policies = {};
  complianceData.forEach((entry) => {
    const policyID = entry.Policy_ID;
    if (!policies[policyID]) {
      policies[policyID] = {
        policy: entry,
        history: [],
      };
    }
    policies[policyID].history.push(entry);
  });

  Object.values(policies).forEach(({ policy, history }) => {
    if (yPosition + 40 > maxPageHeight) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor("#001AFF");

    const policyName = `Policy ${policy.Policy_ID}: ${policy.Policy_Name}`;
    const policyNameWidth =
      (doc.getStringUnitWidth(policyName) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;

    doc.text(policyName, 14, yPosition);

    // Draw underline only under the policy name
    doc.setLineWidth(0.5);
    doc.line(14, yPosition + 2, 14 + policyNameWidth, yPosition + 2);

    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);
    doc.text(`Description: ${policy.Description}`, 14, yPosition);
    yPosition += 8;
    doc.text(`Policy Type: ${policy.Policy_Type}`, 14, yPosition);
    yPosition += 8;
    doc.text(`Resource Group: ${policy.Resource_Group_Name}`, 14, yPosition);
    yPosition += 12;

    doc.text("Historical Compliance and Severity Analysis:", 14, yPosition);
    yPosition += 8;

    history.forEach((entry) => {
      if (yPosition + 8 > maxPageHeight) {
        doc.addPage();
        yPosition = 20;
      }

      doc.text(
        `${entry.Year}: ${entry.Compliance_Status} (Severity: ${entry.Severity})`,
        20,
        yPosition
      );
      yPosition += 8;
    });

    yPosition += 8;
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(12);
    if (i !== 1) {
      doc.text(`${i - 1}`, 170, 280);
    }

    // Set text color and opacity after setting the page
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.setDrawColor(0, 0, 0); // Set draw color to black
    doc.setFontSize(16);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.2 }));

    for (let j = 0; j < 20; j++) {
      for (let k = 0; k < 20; k++) {
        doc.text("Confidential", 5 + k * 60, 5 + j * 40, { angle: 45 });
      }
    }

    doc.restoreGraphicsState();
  }

  return doc;
};

export default GeneratePDFReport;
