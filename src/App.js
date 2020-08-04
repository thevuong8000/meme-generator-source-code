import React from 'react';
import Header from './Header.js'

class App extends React.Component {
	constructor(){
		super()
		this.state = {
			topText: "",
			bottomText: "",
			memeImgURL: "https://i.imgflip.com/26am.jpg",
			memeImages: []
		}
		this.changeHandler = this.changeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
	}

	componentDidMount(){
		fetch("https://api.imgflip.com/get_memes")
			.then(response => response.json())
			.then(response => {
				this.setState({memeImages: response.data.memes})
				console.log(this.state.memeImages[1])
			})
	}
	
	changeHandler(event){
		event.preventDefault()
		const {name, value} = event.target
		this.setState({[name]: value})
	}

	submitHandler(event){
		event.preventDefault()
		var idx = Math.floor(Math.random() * this.state.memeImages.length)
		const newImg = this.state.memeImages[idx].url
		this.setState({memeImgURL: newImg})

	}

	render(){
		return (
			<div>
				<Header />
				<form className="meme-form" onSubmit={this.submitHandler}>
					<input 
						type="text" 
						placeholder="top text"
						name="topText"
						value={this.state.topText}
						onChange={this.changeHandler}
					></input>
					<input 
						type="text" 
						placeholder="bottom text"
						name="bottomText"
						value={this.state.bottomText}
						onChange={this.changeHandler}
					></input>
					<button>Generate</button>

					
				</form>
				<div className="meme">
					<h1 className="top">{this.state.topText}</h1>
					<h1 className="bottom">{this.state.bottomText}</h1>
					<img src={this.state.memeImgURL} alt="error"></img>
				</div>
			</div> 
			
		)
	}
}

export default App;
