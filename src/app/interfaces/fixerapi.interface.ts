export interface FixerApi {
	base:string,
	date:string,
	rates:{[key:string]:number}
}