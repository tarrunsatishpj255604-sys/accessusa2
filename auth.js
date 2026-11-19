
import { supabase } from "./supabase.js";

const form = document.getElementById("signInForm");
const message = document.getElementById("authMessage");
const submitButton = document.getElementById("signInSubmit");

function showMessage(text, type = "error") {
    message.textContent = text;
    message.hidden = false;
    message.dataset.type = type;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;

    message.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = "Signing in...";

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        window.location.href = "dashboard.html";

    } catch (error) {
        showMessage(error.message);

    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML =
            'Sign In <span aria-hidden="true">→</span>';
    }
});

// Show / hide password
document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(
            button.dataset.togglePassword
        );

        if (!input) return;

        const isVisible = input.type === "text";

        input.type = isVisible ? "password" : "text";
        button.textContent = isVisible ? "Show" : "Hide";

        button.setAttribute(
            "aria-label",
            isVisible ? "Show password" : "Hide password"
        );
    });
});

// Google sign-in
const googleButton = document.getElementById("googleSignIn");

if (googleButton) {
    googleButton.addEventListener("click", async () => {
        googleButton.disabled = true;

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: new URL(
                        "dashboard.html",
                        window.location.href
                    ).href
                }
            });

            if (error) throw error;

        } catch (error) {
            showMessage(error.message);
            googleButton.disabled = false;
        }
    });
}
