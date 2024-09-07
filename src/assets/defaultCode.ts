export const defaultCodeSnippet = `// 🚀 Welcome to Code Clip!
// Example code. Feel free to delete this and start coding! ✨

// Greet the user with a fun message
function greetUser(name = "coder") {
  const message = \`👋 Hello, \${name}! Welcome to Code Clip!\`;
  console.log(message);
  return message;
}

// Get a random motivational quote
function getMotivation() {
  const quotes = [
    "Keep pushing forward! 💪",
    "Code like a pro! 😎",
    "Bug-free days ahead! 🚀",
    "You got this! 🔥"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Thank you message from Vishal Gupta
function thankYou() {
  console.log("Built with ❤️ by Vishal Gupta. Happy coding! 💻");
}

// Run the functions below to see them in action
greetUser("awesome dev");
console.log(getMotivation());
thankYou();
`;
