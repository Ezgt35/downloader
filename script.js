document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('file-list');

    fetch('/files')
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${file}</span>
                    <a href="/download/${file}" class="download-btn">Download</a>
                `;
                fileList.appendChild(listItem);
            });
        });
});
