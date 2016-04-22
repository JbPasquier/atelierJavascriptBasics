var userInput = '',
    username = 'user',
    journal = [],
    journalPosition = 0;

document.getElementById('journal').innerHTML = 'Hello ' + username + '<br />man is your friend';
document.getElementById('username').innerHTML = username;

function getContent() {
    userInput = document.getElementById('userInput').value;
}

function journalise(text) {
    document.getElementById("journal").innerHTML += '<br />' + text;
    document.getElementById('userInput').value = '';
}

function execEntry() {
    if (event.keyCode == 13) {
        getContent();
        journal.push(userInput);
        journalPosition++;
        if (userInput !== '') {
            var entry = userInput.split(' ');
            switch (entry[0]) {
                case 'man':
                    journalise('echo text<br />clear<br />su<br />su username<br />history<br />history -c<br />Up & down key to look forward backward<br />man for this message');
                    break;
                case 'echo':
                    entry.shift();
                    echo(entry.join(' ') || username + ' don\'t want to tell you something');
                    break;
                case 'clear':
                    clear();
                    break;
                case 'su':
                    entry.shift();
                    setName(entry.join(' '));
                    break;
                case 'history':
                    if (entry[1] == '-c') {
                        journal = [];
                        journalise('History cleared');
                    } else {
                        journalise(journal.join('<br />'));
                    }
                    break;
                default:
                    journalise('Invalid entry');
                    break;
            }
        } else {
            journalise('Invalid entry');
        }
    } else if (event.keyCode == 38) {
        journalPosition--;
        if (journalPosition >= 0) {
            document.getElementById('userInput').value = journal[journalPosition] || '';
        } else {
            journalPosition = -1;
            document.getElementById('userInput').value = '';
        }
    } else if (event.keyCode == 40) {
        journalPosition++;
        if (journalPosition <= journal.length - 1) {
            document.getElementById('userInput').value = journal[journalPosition] || '';
        } else {
            journalPosition = journal.length;
            document.getElementById('userInput').value = '';
        }
    }
}

function echo(text) {
    journalise(text);
}

function clear() {
    document.getElementById('journal').innerHTML = 'Hello ' + username;
    journalise('Console cleared');
}

function setName(newName) {
    username = newName.replace(/\s/g, '_') || 'user';
    document.getElementById('username').innerHTML = username;
    clear();
    journalise('Username changed to ' + username);
}
