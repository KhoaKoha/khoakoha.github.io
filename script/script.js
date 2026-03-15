(function () {
  'use strict';

  // --- Commands: array of { name, description } for help; execution via switch ---
  const commands = [
    { name: 'help', description: 'List available commands' },
    { name: 'clear', description: 'Clear the terminal' },
    { name: 'about', description: 'About me' },
    { name: 'contact', description: 'Contact info' },
    { name: 'skills', description: 'Skills & tools' },
    { name: 'projects', description: 'Featured projects' },
    { name: 'social', description: 'Social links' },
    { name: 'theme', description: 'Toggle light/dark theme' },
    { name: 'date', description: 'Show current date & time' },
    { name: 'echo', description: 'Echo arguments back' },
  ];

  const inputEl = document.getElementById('command-input');
  const outputEl = document.getElementById('output');
  const cursorEl = document.getElementById('cursor');

  let commandHistory = [];
  let historyIndex = -1;

  function appendOutput(html) {
    const div = document.createElement('div');
    div.className = 'output-line';
    div.innerHTML = html;
    outputEl.appendChild(div);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function echoCommand(cmd, args) {
    const argsStr = args.length ? ' ' + args.join(' ') : '';
    appendOutput(`<span class="cmd-echo">${escapeHtml(cmd)}${escapeHtml(argsStr)}</span>`);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function runCommand(cmd, args) {
    const c = cmd.trim().toLowerCase();

    switch (c) {
      case 'help':
        echoCommand(cmd, args);
        appendOutput('<span class="accent">Available commands:</span>');
        commands.forEach(({ name, description }) => {
          appendOutput(`  <span class="success">${name}</span> — ${description}`);
        });
        break;

      case 'clear':
        outputEl.innerHTML = '';
        break;

      case 'about':
        echoCommand(cmd, args);
        appendOutput('<span class="accent">About</span>');
        appendOutput('I build things for the web. This terminal is made with vanilla HTML, CSS & JS.');
        break;

      case 'contact':
        echoCommand(cmd, args);
        appendOutput('<span class="accent">Contact</span>');
        appendOutput('  Email: hello@example.com');
        appendOutput('  GitHub: github.com/yourusername');
        break;

      case 'skills':
        echoCommand(cmd, args);
        appendOutput('<span class="accent">Skills & tools</span>');
        appendOutput('  JavaScript, HTML, CSS, Node.js, Git');
        break;

      case 'projects':
        echoCommand(cmd, args);
        appendOutput('<span class="accent">Projects</span>');
        appendOutput('  • Terminal (this site)');
        appendOutput('  • Add your projects here');
        break;

      case 'social':
        echoCommand(cmd, args);
        appendOutput('<span class="accent">Social</span>');
        appendOutput('  Twitter: @yourhandle');
        appendOutput('  LinkedIn: linkedin.com/in/yourprofile');
        break;

      case 'theme':
        echoCommand(cmd, args);
        document.body.classList.toggle('theme-light');
        appendOutput(document.body.classList.contains('theme-light') ? 'Switched to light theme.' : 'Switched to dark theme.');
        break;

      case 'date':
        echoCommand(cmd, args);
        appendOutput(new Date().toString());
        break;

      case 'echo':
        echoCommand(cmd, args);
        if (args.length) appendOutput(escapeHtml(args.join(' ')));
        else appendOutput('');
        break;

      case '':
        break;

      default:
        echoCommand(cmd, args);
        appendOutput(`<span class="error">Command not found: ${escapeHtml(c)}</span>. Type <span class="success">help</span> for available commands.`);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const line = inputEl.value.trim();
    if (!line) return;

    commandHistory.push(line);
    historyIndex = commandHistory.length;

    const parts = line.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    runCommand(cmd, args);
    inputEl.value = '';
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex > 0) {
        historyIndex--;
        inputEl.value = commandHistory[historyIndex];
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputEl.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputEl.value = '';
      }
      return;
    }
  }

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleSubmit(e);
    else handleKeyDown(e);
  });

  document.addEventListener('click', function () {
    inputEl.focus();
  });

  // Optional: keep cursor in sync with focus
  inputEl.addEventListener('focus', function () {
    cursorEl.style.opacity = '1';
  });
  inputEl.addEventListener('blur', function () {
    cursorEl.style.opacity = '0.5';
  });
})();
