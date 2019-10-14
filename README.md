# Grid Masonry
Simple grid masonry with JavaScript and CSS Grid
### Installation
```sh
$ npm install gridmasonry --save
```

### Example

#### HTML
```
<div id="grid-masonry" class="grid-masonry">
    <div class="grid-masonry-item">
        <div class="grid-masonry-item__container">
            <div class="grid-masonry-item__image-container">
                <img src="/example/posts/images/1.jpg">
            </div>
            <div class="grid-masonry-item__title">1 element</div>
        </div>
    </div>
    <div class="grid-masonry-item">
        <div class="grid-masonry-item__container">
            <div class="grid-masonry-item__image-container">
                <img src="/example/posts/images/2.jpg">
            </div>
            <div class="grid-masonry-item__title">2 element</div>
        </div>
    </div>
</div>
```
#### JavaScript
```
import GridMasonry from 'GridMasonry';

document.addEventListener('DOMContentLoaded', e => {
    let Masonry = new GridMasonry({
        containerClass:   '.grid-masonry',                 //Container class with a list of items
        itemClass:        '.grid-masonry-item',            //Class of item inside list
        itemContentClass: '.grid-masonry-item__container', //Container class inside each of item
        gridRowGap:       '20px',  //Top and bottom margin
        gridColumnGap:    '25px',  //Left and right margin
        itemMinWith:      '320px', //Min width each of item
        itemMaxWith:      '1fr'    //Max width each of item
      }).init();
});
```
#### Result (with some css styles)
![example](https://raw.githubusercontent.com/yazux/grid-masonry/master/example/example.JPG)

### How to run examle
1. Create blank folder
2. Run commands
```sh
$ cd /path_to_your_blank_folder
$ git clone https://github.com/yazux/grid-masonry.git  
$ npm install
$ npm run dev
```
3. View url http://localhost:8080/example/index.html in your browser
