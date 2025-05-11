// Matrix rain effect with Nord theme colors
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Nord theme colors
  const nordColors = [
    "#88C0D0", // Primary color (nord8)
    "#81A1C1", // Secondary color (nord9)
    "#5E81AC", // Tertiary color (nord10)
    "#A3BE8C", // String color (nord14)
    "#B48EAD", // Number color (nord15)
  ];

  // Characters for the matrix effect
  const chars =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/";

  // Setting up the columns
  const fontSize = 12;
  const columns = Math.floor(canvas.width / fontSize);

  // Array to track the y position of each column
  const drops = [];

  // Array to store color for each column
  const colors = [];

  // Initialize all drops to start at random positions above the screen
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -100);
    colors[i] = nordColors[Math.floor(Math.random() * nordColors.length)];
  }

  // Drawing the matrix rain
  function drawMatrix() {
    // Semi-transparent dark background to create trail effect
    ctx.fillStyle = "rgba(46, 52, 64, 0.05)"; // Nord0 with transparency
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font
    ctx.font = `${fontSize}px monospace`;

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const char = chars[Math.floor(Math.random() * chars.length)];

      // Set text color using column's assigned color
      ctx.fillStyle = colors[i];

      // Draw character
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      // Randomly change color occasionally
      if (Math.random() > 0.99) {
        colors[i] = nordColors[Math.floor(Math.random() * nordColors.length)];
      }

      // Move drop down and reset if it goes off screen
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  // Animation loop
  setInterval(drawMatrix, 50);

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recalculate columns after resize
    const newColumns = Math.floor(canvas.width / fontSize);

    // Add new columns if needed
    while (drops.length < newColumns) {
      drops.push(Math.floor(Math.random() * -100));
      colors.push(nordColors[Math.floor(Math.random() * nordColors.length)]);
    }
  });
});
