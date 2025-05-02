const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type:String,
		required: true,
	},
    password: {
		type:String,
		required: true,
	},
	profile_url: {
		type:String,
		required: true,
	
	},
	date: {
		type:Date,
		required: true,
		default: Date.now(),
	},
	followers:{
    	type:Number,
		default:0,

	},
     follows:{
       		type:Number,
		  default:0,
	 } , 

    private_Post: [{
		title:{
			type:String,
		required: true,
		}, 
	        descp:{
			type:String,
		required: true,
		}, 

	post_url:{
			type:String,
		required: true,
		},
		date: {
			type:Date,
			required: true,
			default: Date.now(),
		} 

	}],
	public_Post:[{
		title:{
			type:String,
		required: true,
		}, 
	        descp:{
			type:String,
		required: true,
		}, 

	post_url:{
			type:String,
		required: true,
		} ,
		date: {
			type:Date,
			required: true,
			default: Date.now(),
		} 

	}],
	protected_Post: [{
		title:{
			type:String,
		required: true,
		}, 
	        descp:{
			type:String,
		required: true,
		}, 

	post_url:{
			type:String,
		required: true,
		} ,
		date: {
			type:Date,
			required: true,
			default: Date.now(),
		} 


	}],
    
	

	 
	private_friends:[
		String
	],
	protected_friends:[
		String],
     
	ultra_private_friends:[
			String]
	



})

module.exports = mongoose.model("Account", userSchema);