var useLocalStorage = false;
var allNews = [];

function isOnline() {
    return window.navigator.onLine;
}

if (useLocalStorage === true) {
    if (isOnline() === true) {
        if (localStorage.getItem('news') !== null) {
            var array = JSON.parse(localStorage.getItem('news'));
            for (var x = 0; x < array.length; x++) {
                var title = array[x][0];
                var text = array[x][1];
                const div = document.createElement('div');
                div.className = "col-md-4";
                div.innerHTML = `

                            <img src="imagine/OE_news_1.png" height="250" width="250" alt="imagine">
                            <h1>` + title + `</h1>
                            <p>` + text + `</p>

                            `;
                document.getElementById('addNew').appendChild(div);
            }
        }
    }
}
window.addEventListener('mouseover', function (event) {
    if (useLocalStorage === false) {
        if (isOnline() === true) {
            storage.get("news", (news) => {
                if (news) {
                    allNews = news;
                }
                showNews(allNews);
                storage.remove("news");
                allNews = [];
            });
        }
    }
});

function pasteNew(title, text) {
    const div = document.createElement('div');
    div.className = "col-md-4";
    div.innerHTML = `

                            <img src="imagine/OE_news_1.png" height="250" width="250" alt="imagine">
                            <h1>` + title + `</h1>
                            <p>` + text + `</p>

                            `;
    document.getElementById('addNew').appendChild(div);
}

function showNews(allNews) {
    allNews.forEach(function (news) {
        pasteNew(news.title, news.text)
    })
}