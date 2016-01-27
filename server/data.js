var data = function(fs) {
	var dataObject = {
		index: {
			bodyText: fs.readFileSync('data/index.html', 'utf8')
		},
		// Blog data
		posts: [
			{
				href: 'caching-umbraco-web-controllers',
				title: 'Caching Umbraco web API controllers',
				summary: 'Caching improves load time for everyone. Here I explain how easily make caching work with Web API controllers.',
				bodyText: fs.readFileSync('data/blog/caching-umbraco-web-controllers.html', 'utf8')
			},
			{
				href: 'installing-iisnode',
				title: 'Installing IISNode for production',
				summary: 'Developing Node.js applications on Windows is easy, but getting them setup for production can be a little more difficult.',
				bodyText: fs.readFileSync('data/blog/installing-iisnode.html', 'utf8')
			}
		],
		// Portfolio data
		exampleGroups: [
			{
				title: 'Personal projects',
				info: 'These are the projects which I have freelanced on.',
				pages: [
					{
						href: 'artists-name-plates',
						cover: 'artistsnameplates.jpg',
						name: 'Artists Name Plates',
						bodyText: fs.readFileSync('data/portfolio/artists-name-plates.html', 'utf8')
					},
					{
						href: 'harvey-williams',
						cover: 'harveywilliams.png',
						name: 'This portfolio site',
						bodyText: fs.readFileSync('data/portfolio/harvey-williams.html', 'utf8')
					}
				]
			}
		]
	};

	return dataObject;
}

module.exports = data;
