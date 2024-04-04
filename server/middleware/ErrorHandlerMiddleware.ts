module.exports = (err:any,req:any,res:any,next:any) =>{
    if(err instanceof Error){
        res.status(err.name).json({message: err.message});
    }
}