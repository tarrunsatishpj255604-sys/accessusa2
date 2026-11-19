
import { supabase } from "./supabase.js";

const form = document.getElementById("signUpForm");
const message = document.getElementById("authMessage");
const submitButton = document.getElementById("signUpSubmit");

function showMessage(text, type = "error") {
    message.textContent = text;
    message.hidden = false;
    message.dataset.type = type;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    message.hidden = true;

    if (!name) {
        showMessage("Please enter your name.");
        return;
    }

    if (password.length < 8) {
        showMessage("Password must be at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Creating account...";

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                },
                emailRedirectTo: new URL(
                    "signin.html",
                    window.location.href
                ).href
            }
        });

        if (error) throw error;

        if (data.session) {
            showMessage(
                "Account created successfully!",
                "success"
            );
        } else {
            showMessage(
                "Account created! Please check your email to confirm.",
                "success"
            );
        }

        form.reset();

    } catch (error) {
        showMessage(error.message);

    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML =
            'Create Account <span aria-hidden="true">→</span>';
    }
});

// Show / hide passwords
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
