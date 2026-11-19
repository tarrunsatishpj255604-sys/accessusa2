
import { supabase } from "./supabase.js";

// =====================================
// ELEMENTS
// =====================================

const $ = (id) => document.getElementById(id);

const sidebar = $("sidebar");
const sidebarToggle = $("sidebarToggle");
const profileMenuToggle = $("profileMenuToggle");
const accountDropdown = $("accountDropdown");
const themeToggle = $("themeToggle");


// =====================================
// DATE AND GREETING
// =====================================

function updateDate() {
    const now = new Date();

    const dateElement = $("currentDate");

    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    const hour = now.getHours();

    let greeting = "Good evening";

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 17) {
        greeting = "Good afternoon";
    }

    if ($("greetingText")) {
        $("greetingText").textContent = greeting;
    }
}

updateDate();


// =====================================
// USER PROFILE
// =====================================

async function loadUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        window.location.href = "signin.html";
        return;
    }

    const user = data.user;

    const name =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User";

    const email = user.email || "";

    if ($("welcomeName")) {
        $("welcomeName").textContent = name;
    }

    if ($("sidebarUserName")) {
        $("sidebarUserName").textContent = name;
    }

    if ($("sidebarUserEmail")) {
        $("sidebarUserEmail").textContent = email;
    }

    if ($("dropdownName")) {
        $("dropdownName").textContent = name;
    }

    if ($("dropdownEmail")) {
        $("dropdownEmail").textContent = email;
    }

    const initial = name.charAt(0).toUpperCase();

    if ($("sidebarAvatar")) {
        $("sidebarAvatar").textContent = initial;
    }

    if ($("topbarAvatar")) {
        $("topbarAvatar").textContent = initial;
    }
}

loadUser();


// =====================================
// SIGN OUT
// =====================================

const signOutButton = $("signOutButton");

if (signOutButton) {
    signOutButton.addEventListener("click", async () => {
        signOutButton.disabled = true;
        signOutButton.textContent = "Signing out...";

        const { error } = await supabase.auth.signOut();

        if (error) {
            signOutButton.disabled = false;
            signOutButton.textContent = "Sign out";
            alert(error.message);
            return;
        }

        window.location.href = "signin.html";
    });
}


// =====================================
// PROFILE DROPDOWN
// =====================================

if (profileMenuToggle && accountDropdown) {
    profileMenuToggle.addEventListener("click", () => {
        const isOpen = !accountDropdown.hidden;

        accountDropdown.hidden = isOpen;

        profileMenuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );
    });

    document.addEventListener("click", (event) => {
        if (
            !event.target.closest(".topbar-profile") &&
            !event.target.closest(".sidebar-profile")
        ) {
            accountDropdown.hidden = true;
            profileMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
}


// =====================================
// MOBILE SIDEBAR
// =====================================

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
        const isOpen = sidebar.classList.toggle("sidebar-open");

        sidebarToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    document.addEventListener("click", (event) => {
        if (
            window.innerWidth <= 900 &&
            !sidebar.contains(event.target) &&
            !sidebarToggle.contains(event.target)
        ) {
            sidebar.classList.remove("sidebar-open");
            sidebarToggle.setAttribute("aria-expanded", "false");
        }
    });
}


// =====================================
// THEME TOGGLE
// =====================================

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight =
            document.documentElement.dataset.theme === "light";

        document.documentElement.dataset.theme =
            isLight ? "dark" : "light";

        themeToggle.textContent = isLight ? "◐" : "☀";
    });
}


// =====================================
// QUICK ADD DIALOG
// =====================================

const quickAddButton = $("quickAddButton");
const quickAddDialog = $("quickAddDialog");
const closeQuickAdd = $("closeQuickAdd");
const cancelQuickAdd = $("cancelQuickAdd");

function closeDialog() {
    if (quickAddDialog?.open) {
        quickAddDialog.close();
    }
}

if (quickAddButton && quickAddDialog) {
    quickAddButton.addEventListener("click", () => {
        quickAddDialog.showModal();
    });
}

closeQuickAdd?.addEventListener("click", closeDialog);
cancelQuickAdd?.addEventListener("click", closeDialog);


// =====================================
// QUICK ADD FORM
// =====================================

const quickAddForm = $("quickAddForm");
const quickAddMessage = $("quickAddMessage");

quickAddForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (quickAddMessage) {
        quickAddMessage.hidden = true;
    }

    const title = $("activityTitle").value.trim();
    const category = $("activityCategory").value;
    const date = $("activityDate").value;
    const startTime = $("activityStart").value;
    const endTime = $("activityEnd").value;
    const description = $("activityDescription").value.trim();

    if (!title || !category || !date || !startTime || !endTime) {
        showQuickAddMessage("Please complete all required fields.");
        return;
    }

    if (endTime <= startTime) {
        showQuickAddMessage("End time must be after start time.");
        return;
    }

    showQuickAddMessage(
        "Your activity form is ready. Database saving will be connected next.",
        "success"
    );
});

function showQuickAddMessage(text, type = "error") {
    if (!quickAddMessage) return;

    quickAddMessage.textContent = text;
    quickAddMessage.dataset.type = type;
    quickAddMessage.hidden = false;
}


// =====================================
// NOTIFICATIONS PLACEHOLDER
// =====================================

$("notificationsButton")?.addEventListener("click", () => {
    alert("You're all caught up!");
});


// =====================================
// SET DEFAULT ACTIVITY DATE
// =====================================

const activityDate = $("activityDate");

if (activityDate) {
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    activityDate.value = localDate;
}


// =====================================
// INITIAL DASHBOARD STATE
// =====================================

console.log("balanceyourtime. dashboard loaded successfully.");
