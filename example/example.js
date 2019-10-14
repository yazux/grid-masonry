let DemoGridMasonry = class DemoGridMasonry {
    constructor(postContainer, postLimit) {
        if (!postContainer || !this.isElement(postContainer)) throw new Error('Post contaier is not correct');
        if (!postLimit || !(postLimit instanceof Number)) postLimit = 100;
        this.postContainer = postContainer;
        this.postLimit = postLimit;
    }

    isElement(element) {
        return element instanceof Element || element instanceof HTMLDocument;  
    }

    getDemoPosts() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/example/posts/posts.json', false);
            xhr.send();
            if (xhr.status != 200) reject({response: xhr.response, status: xhr.status});
            else {
                try {
                    let response = JSON.parse(xhr.response);
                    resolve({response: response, status: xhr.status});
                } catch(e) {
                    reject({response: [], status: xhr.status});
                }
            }
        });
    }

    viewPosts(posts) {
        if (!posts || !(posts instanceof Array)) throw new Error('Posts is not correct, shoud be Array');
        posts.map((post, i) => {
            if (i <= this.postLimit) {
                let postElement = document.createElement("div"),
                    postElementContainer = document.createElement("div"),
                    postImageContainer = document.createElement("div"),
                    postImage = document.createElement("img"),
                    postTitle = document.createElement("div");

                postElement.classList.add('grid-masonry-item');
                postElementContainer.classList.add('grid-masonry-item__container');
                postImageContainer.classList.add('grid-masonry-item__image-container');
                postTitle.classList.add('grid-masonry-item__title');

                postImage.src = post.url;
                postImageContainer.appendChild(postImage);
                postTitle.innerHTML = post.title;

                postElementContainer.appendChild(postImageContainer);
                postElementContainer.appendChild(postTitle);
                postElement.appendChild(postElementContainer);
                this.postContainer.appendChild(postElement);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', e => {
    let initMasonry = () => {
        let Masonry = new GridMasonry({
            containerClass:   '.grid-masonry',       //Класс контейнера с списком элементов
            itemClass:        '.grid-masonry-item',         //Класс элемента внутри списка
            itemContentClass: '.grid-masonry-item__container', //Класс контейнера внутри каждого элемента
            gridRowGap:       '20px', //Отступы между элементами списка сверху и снизу
            gridColumnGap:    '25px', //Отступы между элементами списка по бокам
            itemMinWith:      '320px',              //Минимальная ширина элемента списка
            itemMaxWith:      '1fr'                 //Максимальная ширина элемента списка
          });
          Masonry.init();
    }
    let imageContainer = document.getElementById('grid-masonry');
    let DemoMasonry = new DemoGridMasonry(imageContainer, 100);
    DemoMasonry.getDemoPosts().then(r => {
        DemoMasonry.viewPosts(r.response);
        initMasonry();
    }, r => {
        console.log(r);
    });
});