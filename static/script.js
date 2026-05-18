// Line counter
document.getElementById("code-input").addEventListener("input", function () {
  const lines = this.value.split("\n").length;
  const counter = document.getElementById("line-count");
  counter.textContent = this.value.trim() ? `${lines} lines` : "";
});

// Main analyze function
async function analyzeCode() {
  const code = document.getElementById("code-input").value.trim();
  const language = document.getElementById("language").value;

  if (!code) return alert("Please paste some code first!");

  // Show loader, hide results
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");
  document.getElementById("error-box").classList.add("hidden");
  document.getElementById("analyze-btn").disabled = true;

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language })
    });

    const data = await response.json();

    if (!data.success) throw new Error(data.error || "Something went wrong");

    displayResults(data.result, code);

  } catch (err) {
    document.getElementById("error-box").textContent = "Error: " + err.message;
    document.getElementById("error-box").classList.remove("hidden");
  }

  document.getElementById("loader").classList.add("hidden");
  document.getElementById("analyze-btn").disabled = false;
}

// Display results
function displayResults(result, originalCode) {
  const hasIssues = result.issues && result.issues.length > 0;

  // Issues section
  const issuesHeader = document.getElementById("issues-header");
  const issuesList = document.getElementById("issues-list");

  if (hasIssues) {
    issuesHeader.className = "card-header red";
    document.getElementById("issues-icon").textContent = "⚠";
    document.getElementById("issues-title").textContent = `${result.issues.length} Issue${result.issues.length > 1 ? "s" : ""} Found`;
    issuesList.innerHTML = result.issues.map(issue => `
      <div class="issue-item">
        <div class="issue-title">⚠ ${issue.title}</div>
        <div class="issue-desc">${issue.description}</div>
      </div>
    `).join("");
  } else {
    issuesHeader.className = "card-header green";
    document.getElementById("issues-icon").textContent = "✓";
    document.getElementById("issues-title").textContent = "No Issues Found";
    issuesList.innerHTML = `<p class="no-issues">✓ Your code looks clean!</p>`;
  }

  // Code blocks
  document.getElementById("original-code").textContent = originalCode;
  document.getElementById("fixed-code").textContent = result.fixedCode;

  // Explanation
  document.getElementById("explanation").textContent = result.explanation;

  // Show results
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}

// Copy code helper
function copyCode(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}