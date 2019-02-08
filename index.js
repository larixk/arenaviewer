import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

let slug = window.location.hash.substr(1);
if (!slug) {
	slug = window.prompt('Slug');
	window.location.hash = `#${slug}`;
}

const useLoadChannel = setChannel =>
	useEffect(() => {
		fetch(`http://api.are.na/v2/channels/${slug}`)
			.then(response => response.json())
			.then(json => ({
				title: json.title,
				images: json.contents
					.map(imageContent => ({
						id: imageContent.id,
						src: imageContent.image.large.url
					}))
			}))
			.then(setChannel);
	}, []);

const App = () => {
	const [channel, setChannel] = useState({ images: [], title: "" });
	useLoadChannel(setChannel);

	return (
		<React.Fragment>
			<h1>{channel.title}</h1>
			{channel.images.map(({ id, src }) => (
				<img key={id} src={src} />
			))}
		</React.Fragment>
	);
};


const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
