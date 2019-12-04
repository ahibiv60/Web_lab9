var useLocalStorage = false;
var allAppeals = [];

function isOnline() {
    return window.navigator.onLine;
}

window.addEventListener('offline', function (event) {
    document.getElementById('addComment').onclick = function () {
        let comment = document.getElementById('commentBody');
        // let comment = $.trim($("#commentBody").val());
        let author = currentName();
        let time = currentTime();
        let date = currentDate();

        if (useLocalStorage === true) {
            if (isOnline() === false) {
                if (localStorage.getItem('appeal') === null) {
                    array = [comment.value, author, time, date];
                    localStorage.setItem('appeal', JSON.stringify([array]));
                } else {
                    array = JSON.parse(localStorage.getItem('appeal'));
                    array.push([comment.value, author, time, date]);
                    localStorage.removeItem('appeal');
                    localStorage.setItem('appeal', JSON.stringify(array));
                }
            }
            comment.value = "";
        }
        if (useLocalStorage === false) {
            allAppeals.push({author: author, comment: comment.value, date: date, time: time});
            storage.add("appeals", allAppeals);
            alert("Збережено в IndexedDB");
        }
    };
});

window.addEventListener('online', function (event) {
    let comment = document.getElementById('commentBody');
    // let comment = $.trim($("#commentBody").val());
    if (useLocalStorage === true) {
        if (localStorage.getItem('appeal') !== null) {
            let array = JSON.parse(localStorage.getItem('appeal'));
            for (var x = 0; x < array.length; x++) {
                var l_comment = array[x][0];
                var l_author = array[x][1];
                var l_time = array[x][2];
                var l_date = array[x][3];
                const div = document.createElement('div');
                div.innerHTML = `
                        <br>
                        <div class="row justify-content-center">
                            <div class="border border-dark rounded" style="margin: 0 7% 4% 0; height: 5%">
                                <p>` + l_author + ` <br> ` + l_time + ` <br>` + l_date + `</p>
                                <p></p>
                                <p></p>
                            </div>
                                <div class="border border-dark rounded col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin: 0 1% 0 1%">
                                <p>` + l_comment + `</p>
                            </div>
                        </div>
                        <br>
                        <hr>
                    `;
                document.getElementById('container').append(div);
                comment = "";
            }
        }
    }
    if (useLocalStorage === false) {
        storage.get("appeals", (appeals) => {
            if (appeals) {
                allAppeals = appeals;
            }
            showAppeals(allAppeals);
            storage.remove("appeals");
            allAppeals = [];
        });
    }
});

document.getElementById('addComment').onclick = function () {
    var comment = document.getElementById('commentBody');
    // let comment = $.trim($("#commentBody").val());
    var author = currentName();
    var time = currentTime();
    var date = currentDate();

    if (useLocalStorage === true) {
        if (isOnline() === false) {
            if (localStorage.getItem('appeal') === null) {
                array = [comment.value, author, time, date];
                console.log(array);
                localStorage.setItem('appeal', JSON.stringify([array]));
            } else {
                array = JSON.parse(localStorage.getItem('appeal'));
                array.push([comment.value, author, time, date]);
                localStorage.removeItem('appeal');
                localStorage.setItem('appeal', JSON.stringify(array));
            }
        }
    }
    if (useLocalStorage === false) {
        if (isOnline() === false) {
            allAppeals.push({author: author, comment: comment.value, date: date, time: time});
            storage.add("appeals", allAppeals);
            alert("Збережено в IndexedDb");
        }
    }
};

function pasteAppeal(author, comment, date, time) {
    const div = document.createElement('div');
    div.innerHTML = `
                        <br>
                        <div class="row justify-content-center">
                            <div class="border border-dark rounded" style="margin: 0 7% 4% 0; height: 5%">
                                <p>` + author + ` <br> ` + date + ` <br>` + time + `</p>
                                <p></p>
                                <p></p>
                            </div>
                                <div class="border border-dark rounded col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin: 0 1% 0 1%">
                                <p>` + comment + `</p>
                            </div>
                        </div>
                        <br>
                        <hr>
                    `;
    document.getElementById('container').append(div);
}

function showAppeals(allAppeals) {
    allAppeals.forEach(function (appeal) {
        pasteAppeal(appeal.author, appeal.comment, appeal.date, appeal.time)
    });
}

function currentName() {
    return prompt("Введіть своє ім'я:");
}

function currentTime() {
    let now = new Date();
    console.log(now.getHours() + ":" + now.getMinutes());
    return now.getHours() + ":" + now.getMinutes();
}

function currentDate() {
    let now = new Date();
    console.log(now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear());
    return now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear();
}