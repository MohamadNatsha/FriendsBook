const bannedWords = ['تابع', 'متابعة', 'انضمام', 'ريلز ومقاطع الفيديو القصيرة'].map((word) => `>${word}<`)
const postQuery = '[role="main"] [data-pagelet]';

const deleteIfAd = (node) => {
    try {
        if (node.matches(postQuery)) {
            if (bannedWords.some((word) => node.innerHTML.includes(word))) {
                node.remove()
            }
        }
    } catch (err) {

    }
};

var observer = new WebKitMutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        for (const node of mutation.addedNodes) {
            deleteIfAd(node);
        }
    });
});

observer.observe(document, {
    childList: true,
    subtree: true,
});

const removeAdPosts = () => {
    const posts = Array.from(document.querySelectorAll(postQuery));
    for (const post of posts) {
        deleteIfAd(post);
    }
}

document.addEventListener('DOMContentLoaded', removeAdPosts);