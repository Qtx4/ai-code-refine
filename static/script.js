// ==============================
// LINE COUNTER
// ==============================

const codeInput = document.getElementById("code-input");
const lineCount = document.getElementById("line-count");

codeInput.addEventListener("input", () => {

    const lines = codeInput.value.split("\n").length;

    lineCount.textContent =
        codeInput.value.trim()
            ? `${lines} lines`
            : "";

});

// ==============================
// ANALYZE FUNCTION
// ==============================

async function analyzeCode() {

    const code = codeInput.value.trim();

    const language =
        document.getElementById("language").value;

    const analyzeBtn =
        document.getElementById("analyze-btn");

    const loader =
        document.getElementById("loader");

    const results =
        document.getElementById("results");

    const errorBox =
        document.getElementById("error-box");

    // ==============================
    // VALIDATION
    // ==============================

    if (!code) {

        showError("Please paste some code first.");

        return;
    }

    // ==============================
    // RESET UI
    // ==============================

    errorBox.classList.add("hidden");

    results.classList.add("hidden");

    // SHOW LOADER
    loader.classList.remove("hidden");

    // BUTTON LOADING STATE
    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML =
        "Analyzing...";

    try {

        // ==============================
        // API REQUEST
        // ==============================

        const response = await fetch("/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                code,
                language
            })

        });

        const data = await response.json();

        // ==============================
        // HANDLE ERROR
        // ==============================

        if (!data.success) {

            throw new Error(
                data.error || "Analysis failed"
            );
        }

        // ==============================
        // DISPLAY RESULTS
        // ==============================

        displayResults(data.result, code);

    } catch (error) {

        showError(error.message);

    } finally {

        // ==============================
        // HIDE LOADER
        // ==============================

        loader.classList.add("hidden");

        analyzeBtn.disabled = false;

        analyzeBtn.innerHTML =
            "Analyze Code";

    }

}

// ==============================
// DISPLAY RESULTS
// ==============================

function displayResults(result, originalCode) {

    const hasIssues =
        result.issues &&
        result.issues.length > 0;

    // ELEMENTS
    const issuesHeader =
        document.getElementById("issues-header");

    const issuesList =
        document.getElementById("issues-list");

    // ==============================
    // ISSUES UI
    // ==============================

    if (hasIssues) {

        issuesHeader.className =
            "card-header red";

        document.getElementById("issues-icon")
            .textContent = "⚠";

        document.getElementById("issues-title")
            .textContent =
            `${result.issues.length} Issue${result.issues.length > 1 ? "s" : ""} Found`;

        issuesList.innerHTML =
            result.issues.map(issue => `

            <div class="issue-item fade-in">

                <div class="issue-title">
                    ⚠ ${issue.title}
                </div>

                <div class="issue-desc">
                    ${issue.description}
                </div>

            </div>

        `).join("");

    } else {

        issuesHeader.className =
            "card-header green";

        document.getElementById("issues-icon")
            .textContent = "✓";

        document.getElementById("issues-title")
            .textContent =
            "No Issues Found";

        issuesList.innerHTML = `

            <p class="no-issues fade-in">
                ✓ Your code looks clean!
            </p>

        `;
    }

    // ==============================
    // CODE BLOCKS
    // ==============================

    document.getElementById("original-code")
        .textContent = originalCode;

    document.getElementById("fixed-code")
        .textContent = result.fixedCode;

    // ==============================
    // EXPLANATION
    // ==============================

    document.getElementById("explanation")
        .textContent = result.explanation;

    // ==============================
    // SHOW RESULTS
    // ==============================

    const results =
        document.getElementById("results");

    results.classList.remove("hidden");

    results.classList.add("fade-in");

    results.scrollIntoView({
        behavior: "smooth"
    });

}

// ==============================
// COPY CODE
// ==============================

function copyCode(elementId) {

    const text =
        document.getElementById(elementId)
            .textContent;

    navigator.clipboard.writeText(text);

    showToast("Copied to clipboard!");

}

// ==============================
// SHOW ERROR
// ==============================

function showError(message) {

    const errorBox =
        document.getElementById("error-box");

    errorBox.textContent =
        "Error: " + message;

    errorBox.classList.remove("hidden");

}

// ==============================
// TOAST NOTIFICATION
// ==============================

function showToast(message) {

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2200);

}