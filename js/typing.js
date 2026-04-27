document.addEventListener("DOMContentLoaded", () => {
    const text = "alan myszka";
    const el = document.getElementById("typing");

    let i = -1;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;

            const speed = 100 + Math.random() * 80;
            setTimeout(type, speed);
        }
    }

    type();
});