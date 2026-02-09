document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending…";

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Honeypot check (client-side)
    if (payload.company) {
      return;
    }

    // Turnstile token
    const turnstileToken =
      document.querySelector('input[name="cf-turnstile-response"]')?.value;

    payload.turnstileToken = turnstileToken;
    payload.source = "bryanttechsolutions.com";

    try {
      const response = await fetch("https://hgy8rk84xb.execute-api.us-east-2.amazonaws.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      status.textContent = "Thanks! We’ll be in touch shortly.";
      form.reset();

      // Reset Turnstile
      if (window.turnstile) {
        turnstile.reset();
      }

    } catch (err) {
      console.error(err);
      status.textContent =
        "Something went wrong. Please try again later.";
    }
  });
});
