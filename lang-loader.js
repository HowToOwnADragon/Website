const userLanguage = navigator.language.substring(0, 2);
const langFile = `/language/lang-en.js`; // ${userLanguage}
const script = document.createElement('script');
script.src = langFile;
const currentPath = window.location.pathname;

console.log('Loading lang-loader.js');
console.log('User Language:', userLanguage);
console.log('Language File:', langFile);

script.onload = function () {
    if (typeof lang !== 'undefined') {
        updateContent();
    } else {
        console.error('Error: The lang object is not defined in the language file.');
    }
};

script.onerror = function () {
    console.error('Error: Failed to load the language file.');
};

document.head.appendChild(script);

function updateContent() {
    // Language for index.html
    if (currentPath.includes('index.html')) {
        
    } else if (currentPath.includes('wiki/main.html')) {
    // Language for wiki/main.html
        document.getElementById('main-page-title').textContent = lang.mainPageTitle;
    } else if (currentPath.includes('wiki/dragons/dragons.html')) {
    // Language for wiki/dragons/dragons.html
        document.getElementById('dragons-category-title').textContent = lang.dragonsCategoryTitle;
    } else if (currentPath.includes('wiki/dragons/gronckle/gronckle.html')) {
        // Language for wiki/dragons/gronckle.html
            document.getElementById('gronckle-page-title').textContent = lang.groncklePageTitle;
            document.getElementById('gronckle-p1').textContent = lang.gronckleP1;
    } else {
        console.log('Unknown page is loaded.');
    }
}

script.onload = function() {
    console.log('Language file loaded successfully');
    updateContent();
};
