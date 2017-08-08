
export interface IGeolocation {
	lat : string;
	lng : string;
}

export interface IAddress {
	street : string;
	suite : string;
	city : string;
	zipcode : string;
	geo : IGeolocation;
}

export interface ICompany {
	name : string;
	catchPhrase : string;
	bs : string;
}

export interface IUser {
	id : number;
	name : string;
	username : string;
	email : string;
	address : IAddress;
	phone : string;
	website : string;
	company : ICompany;
}

export interface IRUsers {
	users : Array<IUser>;
}
