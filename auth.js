
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

// Show and hide password
document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(
            button.dataset.togglePassword
        );

        if (!input) return;

        const showing = input.type === "text";
        input.type = showing ? "password" : "text";
        button.textContent = showing ? "Show" : "Hide";
    });
});

// Google sign-in
const googleButton = document.getElementById("googleSignIn");

if (googleButton) {
    googleButton.addEventListener("click", async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin +
                    window.location.pathname.replace(
                        "signin.html",
                        "dashboard.html"
                    )
            }
        });

        if (error) showMessage(error.message);
    });
}
