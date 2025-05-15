const bannedWords = [
    // Arabic support
    'تابع', 'متابعة', 'انضمام', 'ريلز ومقاطع الفيديو القصيرة',
    // English support
    'Follow', 'Join'
].map((word) => `>${word}<`)

const queries = [
    // Arabic
    '[role="main"] [data-pagelet]',
    // English
    '[data-virtualized]',
]


const deleteIfAd = (node) => {
    try {
        if (queries.some((query) => node.matches(query))) {
            if (bannedWords.some((word) => node.innerHTML.includes(word))) {
                node.style.setProperty('display', 'none', 'important');
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
    for(const query of queries) {
        const posts = Array.from(document.querySelectorAll(query));
        for (const post of posts) {
            deleteIfAd(post);
        }
    }
}

document.addEventListener('DOMContentLoaded', removeAdPosts);