let blacklist = [
	"memes", 
	"wholesomememes",
	"dankmemes",
	"starterpacks",
	"TIHI",
	"aww",
	"ATBGE",
	"teenagers",
	"cursedcomments",
	"blursedimages",
	"PewdiepieSubmissions",
	"cursedimages",
	"quityourbullshit",
	"youngpeopleyoutube",
	"FellowKids",
	"imsorryjon",
	"trashy",
	"antiMLM",
	"ChoosingBeggars",
	"PeopleFuckingDying",
	"PrequelMemes",
	"BikiniBottomTwitter",
	"witcher",
	"insanepeoplefacebook",
	"bonehurtingjuice",
	"rarepuppers",
	"Minecraft"
];

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// console.log("Block subreddit is loaded");
		// ----------------------------------------------------------
		
		blockSubreddits();
		
		const targetNode = document.body;

		// Options for the observer (which mutations to observe)
		// Set attributes to false if you do not care if existing nodes have changed,
		//  otherwise set it true. 
		const config = { attributes: false, childList: true, subtree: true };
		
		// Callback function to execute when mutations are observed
		const callback = function(mutationsList, observer) {
			blockSubreddits();
		};
		
		// Create an observer instance linked to the callback function
		const observer = new MutationObserver(callback);
		
		// Start observing the target node for configured mutations
		observer.observe(targetNode, config);
	}
	}, 10);
});

function blockSubreddits() {
	let posts = document.getElementsByClassName("Post")
	Array.from(posts).forEach(element => {
		const regex = /\nr\/([^\n]*)\n/;
		const matches = regex.exec(element.innerText);
		if (matches && matches.length == 2) {
			const name = matches[1];
			// console.log('name of subreddit:', name);
			if (blacklist.includes(name)) {
				console.log("removing", name);
				element.remove();
			}
		} else {
			// console.log(element)
		}
	})
}