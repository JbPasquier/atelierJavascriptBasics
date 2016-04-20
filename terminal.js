var userEntry = '',
    username = 'user',
    journal = [],
    currLength = 0;

document.getElementById('journal').innerHTML = 'Hello ' + username;
document.getElementById('username').innerHTML = username;

function getContent() {
    userEntry = document.getElementById('userInput').value;
}

function journalise(text) {
    document.getElementById("journal").innerHTML += '<br />' + text;
    document.getElementById('userInput').value = '';
}

function execEntry() {
    if (event.keyCode == 13) {
        getContent();
        journal.push(userEntry);
        currLength++;
        if (userEntry !== '') {
            var entry = userEntry.split(' ');
            switch (entry[0]) {
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
    } else if(event.keyCode == 38) {
        currLength--;
        if(currLength >= journal.length) currLength = journal.length-1;
        if(currLength <= 0) currLength = 0;
        document.getElementById('userInput').value = journal[currLength] || '';
    } else if(event.keyCode == 40) {
        currLength++;
        if(currLength >= journal.length) currLength = journal.length-1;
        if(currLength <= 0) currLength = 0;
        document.getElementById('userInput').value = journal[currLength] || '';
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
